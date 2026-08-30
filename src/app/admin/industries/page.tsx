import Link from "next/link";
import { adminUrl } from "@/lib/admin/config";
import { AdminBadge } from "@/components/admin/admin-badge";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export default async function AdminIndustriesPage() {
  const client = createServiceRoleClient();
  const { data: industries } = client
    ? await client
        .from("industries")
        .select("id, title, slug, sort_order, visible, status, featured")
        .order("sort_order", { ascending: true })
    : { data: [] };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Industries</h1>
          <p>Manage industry detail pages and homepage industry cards.</p>
        </div>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Order</th>
                <th>Featured</th>
                <th>Visible</th>
                <th>Status</th>
                <th className="admin-table-actions">Edit</th>
              </tr>
            </thead>
            <tbody>
              {(industries ?? []).map((industry) => (
                <tr key={industry.id}>
                  <td>
                    <strong>{industry.title}</strong>
                  </td>
                  <td>
                    <Link href={`/industries/${industry.slug}`} target="_blank">
                      {industry.slug}
                    </Link>
                  </td>
                  <td>{industry.sort_order}</td>
                  <td>
                    <AdminBadge value={industry.featured} />
                  </td>
                  <td>
                    <AdminBadge value={industry.visible} />
                  </td>
                  <td>
                    <AdminBadge value={industry.status} type="status" />
                  </td>
                  <td className="admin-table-actions">
                    <Link href={adminUrl(`/industries/${industry.id}`)} className="admin-btn admin-btn--ghost admin-btn--sm">
                      Edit
                    </Link>
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
