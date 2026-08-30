import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { adminUrl } from "@/lib/admin/config";
import { getAdminSession } from "@/lib/auth/session";

export default async function AdminRootPage() {
  const session = await getAdminSession();
  if (session) redirect(adminUrl("/dashboard"));
  return <AdminLoginForm />;
}
