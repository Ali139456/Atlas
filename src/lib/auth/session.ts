import { createHash, randomBytes } from "crypto";
import { cookies, headers } from "next/headers";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/config";

const SESSION_DAYS = 7;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export type AdminSession = {
  id: string;
  adminId: string;
  username: string;
  displayName: string | null;
};

export async function createAdminSession(adminId: string) {
  const admin = createServiceRoleClient();
  if (!admin) throw new Error("Database not configured");

  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const userAgent = headerStore.get("user-agent");

  await admin.from("admin_sessions").insert({
    admin_id: adminId,
    token_hash: tokenHash,
    expires_at: expiresAt.toISOString(),
    ip_address: ip,
    user_agent: userAgent,
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return token;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;

  const admin = createServiceRoleClient();
  if (!admin) return null;

  const tokenHash = hashToken(token);
  const { data: session } = await admin
    .from("admin_sessions")
    .select("id, admin_id, expires_at, admins(id, username, display_name, is_active)")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (!session) return null;
  if (new Date(session.expires_at) < new Date()) {
    await admin.from("admin_sessions").delete().eq("id", session.id);
    return null;
  }

  const adminRow = session.admins as
    | { id: string; username: string; display_name: string | null; is_active: boolean }
    | { id: string; username: string; display_name: string | null; is_active: boolean }[]
    | null;

  const profile = Array.isArray(adminRow) ? adminRow[0] : adminRow;
  if (!profile?.is_active) return null;

  return {
    id: session.id,
    adminId: profile.id,
    username: profile.username,
    displayName: profile.display_name,
  };
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (token) {
    const admin = createServiceRoleClient();
    if (admin) {
      await admin.from("admin_sessions").delete().eq("token_hash", hashToken(token));
    }
  }
  cookieStore.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function destroyAllAdminSessions(adminId: string) {
  const admin = createServiceRoleClient();
  if (!admin) return;
  await admin.from("admin_sessions").delete().eq("admin_id", adminId);
}
