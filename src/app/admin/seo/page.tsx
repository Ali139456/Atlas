import { AdminBadge } from "@/components/admin/admin-badge";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export default async function AdminSeoPage() {
  const client = createServiceRoleClient();
  const { data: pages } = client
    ? await client
        .from("pages")
        .select("slug, title, seo_title, seo_description, robots_index, robots_follow, status")
        .order("slug")
    : { data: [] };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>SEO</h1>
          <p>Page metadata, robots flags, and canonical URLs.</p>
        </div>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>SEO title</th>
                <th>Description</th>
                <th>Index</th>
                <th>Follow</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(pages ?? []).map((page) => (
                <tr key={page.slug}>
                  <td>
                    <strong>{page.title}</strong>
                  </td>
                  <td>{page.seo_title ?? "—"}</td>
                  <td>{page.seo_description ?? "—"}</td>
                  <td>
                    <AdminBadge value={page.robots_index} />
                  </td>
                  <td>
                    <AdminBadge value={page.robots_follow} />
                  </td>
                  <td>
                    <AdminBadge value={page.status} type="status" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
