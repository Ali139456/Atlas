import type { Metadata } from "next";
import { SiteLogo } from "@/components/site-logo";
import { getAdminSession } from "@/lib/auth/session";
import { AdminShell } from "@/components/admin/admin-shell";
import "./admin.css";

export const metadata: Metadata = {
  title: "Atlas Control",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
  },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  if (!session) {
    return (
      <div className="admin-login-wrap">
        <div className="admin-login-card">
          <div className="admin-login-logo">
            <SiteLogo className="admin-login-logo-img" />
          </div>
          {children}
        </div>
      </div>
    );
  }

  return <AdminShell session={session}>{children}</AdminShell>;
}
