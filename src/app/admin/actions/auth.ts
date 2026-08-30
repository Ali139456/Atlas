"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { adminUrl } from "@/lib/admin/config";
import { z } from "zod";
import { writeAuditLog } from "@/lib/admin/audit";
import { isLoginRateLimited, recordLoginAttempt } from "@/lib/auth/rate-limit";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import {
  createAdminSession,
  destroyAdminSession,
  destroyAllAdminSessions,
  getAdminSession,
} from "@/lib/auth/session";
import { createServiceRoleClient } from "@/lib/supabase/admin";

const loginSchema = z.object({
  username: z.string().min(2).max(80),
  password: z.string().min(8).max(200),
});

export type AuthActionState = {
  ok: boolean;
  error?: string;
};

export async function loginAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { ok: false, error: "Enter a valid username and password." };
  }

  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (await isLoginRateLimited(ip)) {
    return { ok: false, error: "Too many attempts. Try again in 15 minutes." };
  }

  const admin = createServiceRoleClient();
  if (!admin) {
    return { ok: false, error: "CMS database is not configured." };
  }

  const { username, password } = parsed.data;
  const { data: user } = await admin
    .from("admins")
    .select("id, username, password_hash, is_active")
    .eq("username", username)
    .maybeSingle();

  if (!user?.is_active || !(await verifyPassword(password, user.password_hash))) {
    await recordLoginAttempt(ip, username, false);
    return { ok: false, error: "Invalid username or password." };
  }

  await recordLoginAttempt(ip, username, true);
  await admin
    .from("admins")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", user.id);
  await createAdminSession(user.id);
  await writeAuditLog({
    adminId: user.id,
    action: "login",
    entityType: "admin",
    entityId: user.id,
    entityName: user.username,
  });

  return { ok: true };
}

export async function logoutAction() {
  const session = await getAdminSession();
  await destroyAdminSession();
  if (session) {
    await writeAuditLog({
      adminId: session.adminId,
      action: "logout",
      entityType: "admin",
      entityId: session.adminId,
      entityName: session.username,
    });
  }
}

export async function logoutFormAction() {
  await logoutAction();
  redirect(adminUrl());
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

const changePasswordSchema = z.object({
  currentPassword: z.string().min(8).max(200),
  newPassword: z.string().min(12).max(200),
  confirmPassword: z.string().min(12).max(200),
});

export type ChangePasswordState = { ok: boolean; error?: string; message?: string };

export async function changePasswordAction(
  _prev: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const session = await requireAdminSession();
  const parsed = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { ok: false, error: "Enter valid passwords (new password min 12 characters)." };
  }

  const { currentPassword, newPassword, confirmPassword } = parsed.data;
  if (newPassword !== confirmPassword) {
    return { ok: false, error: "New passwords do not match." };
  }

  const admin = createServiceRoleClient();
  if (!admin) return { ok: false, error: "Database not configured." };

  const { data: user } = await admin
    .from("admins")
    .select("id, username, password_hash")
    .eq("id", session.adminId)
    .maybeSingle();

  if (!user || !(await verifyPassword(currentPassword, user.password_hash))) {
    return { ok: false, error: "Current password is incorrect." };
  }

  const passwordHash = await hashPassword(newPassword);
  const { error } = await admin
    .from("admins")
    .update({ password_hash: passwordHash, updated_at: new Date().toISOString() })
    .eq("id", user.id);

  if (error) return { ok: false, error: error.message };

  await destroyAllAdminSessions(user.id);
  await createAdminSession(user.id);

  await writeAuditLog({
    adminId: user.id,
    action: "password_changed",
    entityType: "admin",
    entityId: user.id,
    entityName: user.username,
  });

  return { ok: true, message: "Password updated. Other sessions were signed out." };
}
