import Link from "next/link";
import { adminUrl } from "@/lib/admin/config";
import { AdminBadge } from "@/components/admin/admin-badge";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export default async function AdminSectionsPage() {
  const client = createServiceRoleClient();
  const { data: sections } = client
    ? await client
        .from("page_sections")
        .select("id, section_key, section_type, sort_order, visible, status, pages(slug, title)")
        .order("sort_order", { ascending: true })
    : { data: [] };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Sections</h1>
          <p>Edit homepage and page sections. Publish changes to update the live site.</p>
        </div>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Section</th>
                <th>Type</th>
                <th>Order</th>
                <th>Visible</th>
                <th>Status</th>
                <th className="admin-table-actions">Edit</th>
              </tr>
            </thead>
            <tbody>
              {(sections ?? []).map((section) => {
                const page = Array.isArray(section.pages) ? section.pages[0] : section.pages;
                return (
                  <tr key={section.id}>
                    <td>{page?.title ?? page?.slug ?? "—"}</td>
                    <td>
                      <strong>{section.section_key}</strong>
                    </td>
                    <td>{section.section_type}</td>
                    <td>{section.sort_order}</td>
                    <td>
                      <AdminBadge value={section.visible} />
                    </td>
                    <td>
                      <AdminBadge value={section.status} type="status" />
                    </td>
                    <td className="admin-table-actions">
                      <Link href={adminUrl(`/sections/${section.id}`)} className="admin-btn admin-btn--ghost admin-btn--sm">
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
