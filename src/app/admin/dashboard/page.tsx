import Link from "next/link";
import { adminUrl } from "@/lib/admin/config";
import { getAdminDashboardStats } from "@/lib/admin/dashboard-stats";

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();

  return (
    <div className="admin-page admin-page--fit">
      <div className="admin-page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Manage Atlas Global Finance website content and inquiries.</p>
        </div>
      </div>

      <div className="admin-stat-grid">
        <article className="admin-stat-card">
          <span className="admin-stat-label">Pages</span>
          <strong className="admin-stat-value">{stats.pages}</strong>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-label">Services</span>
          <strong className="admin-stat-value">{stats.services}</strong>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-label">Industries</span>
          <strong className="admin-stat-value">{stats.industries}</strong>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-label">Contact Inquiries</span>
          <strong className="admin-stat-value">{stats.inquiries}</strong>
        </article>
      </div>

      <div className="admin-two-col">
        <section className="admin-panel">
          <div className="admin-panel-head">
            <h2>Recent inquiries</h2>
            <Link href={adminUrl("/inquiries")}>View all</Link>
          </div>
          <div className="admin-list-scroll">
            <ul className="admin-list">
              {stats.recentInquiries.length ? (
                stats.recentInquiries.map((item) => (
                  <li key={item.id}>
                    <strong>{item.name}</strong>
                    <span>{item.email}</span>
                    <span className="admin-muted">{new Date(item.created_at).toLocaleString()}</span>
                  </li>
                ))
              ) : (
                <li className="admin-muted">No inquiries yet.</li>
              )}
            </ul>
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-head">
            <h2>Recent updates</h2>
            <Link href={adminUrl("/audit")}>Audit log</Link>
          </div>
          <div className="admin-list-scroll">
            <ul className="admin-list">
              {stats.recentAudit.length ? (
                stats.recentAudit.map((item) => (
                  <li key={item.id}>
                    <strong>{item.action}</strong>
                    <span>
                      {item.entity_type}
                      {item.entity_name ? ` · ${item.entity_name}` : ""}
                    </span>
                    <span className="admin-muted">{new Date(item.created_at).toLocaleString()}</span>
                  </li>
                ))
              ) : (
                <li className="admin-muted">No audit entries yet.</li>
              )}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
