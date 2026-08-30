import { createServiceRoleClient } from "@/lib/supabase/admin";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

export async function isLoginRateLimited(ip: string) {
  const admin = createServiceRoleClient();
  if (!admin) return false;

  const since = new Date(Date.now() - WINDOW_MS).toISOString();
  const { count } = await admin
    .from("login_attempts")
    .select("*", { count: "exact", head: true })
    .eq("ip_address", ip)
    .eq("success", false)
    .gte("attempted_at", since);

  return (count ?? 0) >= MAX_ATTEMPTS;
}

export async function recordLoginAttempt(ip: string, username: string, success: boolean) {
  const admin = createServiceRoleClient();
  if (!admin) return;
  await admin.from("login_attempts").insert({
    ip_address: ip,
    username,
    success,
  });
}
