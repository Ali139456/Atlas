import Link from "next/link";
import { adminUrl } from "@/lib/admin/config";
import { AdminBadge } from "@/components/admin/admin-badge";
import { AdminSubmitForm } from "@/components/admin/admin-submit-form";
import { savePageAction } from "@/app/admin/actions/pages";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export default async function AdminPagesPage() {
  const client = createServiceRoleClient();
  const { data: pages } = client
    ? await client
        .from("pages")
        .select("id, slug, title, status, show_in_nav, is_system, seo_title")
        .order("slug")
    : { data: [] };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Pages</h1>
          <p>Manage site pages, slugs, and SEO metadata.</p>
        </div>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Status</th>
                <th>In nav</th>
                <th>System</th>
                <th className="admin-table-actions">View</th>
              </tr>
            </thead>
            <tbody>
              {(pages ?? []).map((page) => (
                <tr key={page.id}>
                  <td>
                    <strong>{page.title}</strong>
                  </td>
                  <td>{page.slug}</td>
                  <td>
                    <AdminBadge value={page.status} type="status" />
                  </td>
                  <td>
                    <AdminBadge value={page.show_in_nav} />
                  </td>
                  <td>
                    <AdminBadge value={page.is_system} />
                  </td>
                  <td className="admin-table-actions">
                    <Link
                      href={page.slug === "home" ? "/" : `/${page.slug}`}
                      target="_blank"
                      className="admin-btn admin-btn--ghost admin-btn--sm"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section className="admin-panel">
        <h2>Create page</h2>
        <AdminSubmitForm
          action={savePageAction}
          className="admin-form-grid"
          loadingMessage="Creating page…"
          successMessage="Page created"
        >
          <label className="admin-field">
            Title
            <input type="text" name="title" required />
          </label>
          <label className="admin-field">
            Slug
            <input type="text" name="slug" required />
          </label>
          <label className="admin-field admin-field--full">
            Description
            <textarea name="description" rows={3} />
          </label>
          <label className="admin-field">
            SEO title
            <input type="text" name="seo_title" />
          </label>
          <label className="admin-field">
            SEO description
            <textarea name="seo_description" rows={2} />
          </label>
          <div className="admin-check-row">
            <label className="admin-check">
              <input type="checkbox" name="show_in_nav" /> Show in navigation
            </label>
            <label className="admin-check">
              <input type="checkbox" name="robots_index" defaultChecked /> Allow indexing
            </label>
            <label className="admin-check">
              <input type="checkbox" name="robots_follow" defaultChecked /> Allow follow
            </label>
            <label className="admin-check">
              <input type="checkbox" name="publish" defaultChecked /> Publish immediately
            </label>
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary">
              Create page
            </button>
          </div>
        </AdminSubmitForm>
      </section>

      <p className="admin-muted">
        Homepage sections are edited under{" "}
        <Link href={adminUrl("/sections")}>Sections</Link>.
      </p>
    </div>
  );
}
