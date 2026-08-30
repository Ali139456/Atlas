"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  ClipboardList,
  FileText,
  FolderOpen,
  Footprints,
  ImageIcon,
  LayoutDashboard,
  Layers,
  LogOut,
  Mail,
  Menu,
  Navigation,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { SiteLogo } from "@/components/site-logo";
import { adminUrl } from "@/lib/admin/config";
import type { AdminSession } from "@/lib/auth/session";
import { previewHomeAction } from "@/app/admin/actions/preview";
import { publishAllCmsContentAction } from "@/app/admin/actions/cms";
import { logoutFormAction } from "@/app/admin/actions/auth";
import { AdminSubmitForm } from "@/components/admin/admin-submit-form";
import { AdminToastProvider } from "@/components/admin/admin-toast";

const navGroups = [
  {
    label: "Overview",
    items: [{ href: adminUrl("/dashboard"), label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Content",
    items: [
      { href: adminUrl("/pages"), label: "Pages", icon: FileText },
      { href: adminUrl("/sections"), label: "Sections", icon: Layers },
      { href: adminUrl("/services"), label: "Services", icon: Sparkles },
      { href: adminUrl("/industries"), label: "Industries", icon: BookOpen },
      { href: adminUrl("/navigation"), label: "Navigation", icon: Navigation },
    ],
  },
  {
    label: "Site",
    items: [
      { href: adminUrl("/media"), label: "Media", icon: ImageIcon },
      { href: adminUrl("/footer"), label: "Footer", icon: Footprints },
      { href: adminUrl("/forms"), label: "Form Options", icon: ClipboardList },
      { href: adminUrl("/seo"), label: "SEO", icon: Search },
    ],
  },
  {
    label: "System",
    items: [
      { href: adminUrl("/inquiries"), label: "Inquiries", icon: Mail },
      { href: adminUrl("/settings"), label: "Global Settings", icon: Settings },
      { href: adminUrl("/audit"), label: "Audit Log", icon: FolderOpen },
    ],
  },
];

function pageTitle(pathname: string) {
  const item = navGroups.flatMap((g) => g.items).find((i) => i.href === pathname);
  if (item) return item.label;
  if (pathname.endsWith("/services/new")) return "New service";
  if (pathname.includes("/services/")) return "Edit service";
  if (pathname.includes("/industries/")) return "Edit industry";
  if (pathname.includes("/sections/")) return "Edit section";
  return "Atlas Admin";
}

export function AdminShell({
  session,
  children,
}: {
  session: AdminSession;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <AdminToastProvider>
      <div className="admin-shell">
      <aside className={`admin-sidebar${mobileNav ? " is-open" : ""}`}>
        <div className="admin-sidebar-inner">
          <div className="admin-sidebar-brand">
            <SiteLogo className="admin-sidebar-logo" />
            <div>
              <p className="admin-sidebar-title">Atlas Control</p>
              <p className="admin-sidebar-sub">Content management</p>
            </div>
          </div>

          <nav className="admin-sidebar-nav" aria-label="Admin">
            {navGroups.map((group) => (
              <div key={group.label} className="admin-sidebar-group">
                <p className="admin-sidebar-group-label">{group.label}</p>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`admin-sidebar-link${active ? " is-active" : ""}`}
                      onClick={() => setMobileNav(false)}
                    >
                      <Icon className="admin-sidebar-icon" strokeWidth={1.75} aria-hidden />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {mobileNav ? (
        <button
          type="button"
          className="admin-sidebar-backdrop"
          aria-label="Close menu"
          onClick={() => setMobileNav(false)}
        />
      ) : null}

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-mobile-menu"
              aria-label="Open menu"
              onClick={() => setMobileNav(true)}
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <div>
              <p className="admin-topbar-eyebrow">Atlas Global Finance</p>
              <h1 className="admin-topbar-title">{pageTitle(pathname)}</h1>
            </div>
          </div>

          <div className="admin-topbar-actions">
            <AdminSubmitForm action={previewHomeAction} successMessage="Preview mode enabled">
              <button type="submit" className="admin-btn admin-btn--ghost">
                Preview
              </button>
            </AdminSubmitForm>
            <AdminSubmitForm
              action={publishAllCmsContentAction}
              loadingMessage="Publishing all drafts…"
              successMessage="All drafts published"
            >
              <button type="submit" className="admin-btn admin-btn--primary">
                Publish all
              </button>
            </AdminSubmitForm>
            <Link href="/" target="_blank" className="admin-btn admin-btn--ghost">
              View site
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <div className="admin-user-chip">
              <span className="admin-user-dot" aria-hidden />
              {session.displayName ?? session.username}
            </div>
            <form action={logoutFormAction}>
              <button type="submit" className="admin-btn admin-btn--ghost" aria-label="Logout">
                <LogOut className="h-4 w-4" aria-hidden />
              </button>
            </form>
          </div>
        </header>

        <main className="admin-content">
          <div className="admin-content-inner">{children}</div>
        </main>
      </div>
    </div>
    </AdminToastProvider>
  );
}
