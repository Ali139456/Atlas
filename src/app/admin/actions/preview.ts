"use server";

import { redirect } from "next/navigation";
import { revalidateCmsContent } from "@/lib/cms/revalidate";
import { PREVIEW_COOKIE } from "@/lib/cms/preview";
import { writeAuditLog } from "@/lib/admin/audit";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { cookies } from "next/headers";

export async function enablePreviewModeAction() {
  await requireAdmin();
  const cookieStore = await cookies();
  cookieStore.set(PREVIEW_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });
}

export async function disablePreviewModeAction() {
  await requireAdmin();
  const cookieStore = await cookies();
  cookieStore.set(PREVIEW_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export async function previewHomeAction() {
  await enablePreviewModeAction();
  redirect("/?preview=1");
}
