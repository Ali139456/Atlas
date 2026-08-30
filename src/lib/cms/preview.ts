import { cookies } from "next/headers";
import { getAdminSession } from "@/lib/auth/session";

export const PREVIEW_COOKIE = "atlas_cms_preview";

export async function isCmsPreviewMode(): Promise<boolean> {
  const session = await getAdminSession();
  if (!session) return false;
  const cookieStore = await cookies();
  return cookieStore.get(PREVIEW_COOKIE)?.value === "1";
}
