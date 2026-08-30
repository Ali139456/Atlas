import Link from "next/link";
import { adminUrl } from "@/lib/admin/config";
import { AdminBadge } from "@/components/admin/admin-badge";
import { AdminSubmitForm } from "@/components/admin/admin-submit-form";
import { publishAllCmsContentAction } from "@/app/admin/actions/cms";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export default async function AdminServicesPage() {
  const client = createServiceRoleClient();
  const { data: services } = client
    ? await client
        .from("services")
        .select("id, title, slug, sort_order, visible, status, featured")
        .order("sort_order", { ascending: true })
    : { data: [] };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Services</h1>
          <p>Manage service pages, ordering, visibility, and publishing.</p>
        </div>
        <div className="admin-toolbar">
          <Link href={adminUrl("/services/new")} className="admin-btn admin-btn--primary">
            Add service
          </Link>
          <AdminSubmitForm
            action={publishAllCmsContentAction}
            loadingMessage="Publishing all drafts…"
            successMessage="All drafts published"
          >
            <button type="submit" className="admin-btn admin-btn--ghost">
              Publish all drafts
            </button>
          </AdminSubmitForm>
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
              {(services ?? []).map((service) => (
                <tr key={service.id}>
                  <td>
                    <strong>{service.title}</strong>
                  </td>
                  <td>
                    <Link href={`/services/${service.slug}`} target="_blank">
                      {service.slug}
                    </Link>
                  </td>
                  <td>{service.sort_order}</td>
                  <td>
                    <AdminBadge value={service.featured} />
                  </td>
                  <td>
                    <AdminBadge value={service.visible} />
                  </td>
                  <td>
                    <AdminBadge value={service.status} type="status" />
                  </td>
                  <td className="admin-table-actions">
                    <Link href={adminUrl(`/services/${service.id}`)} className="admin-btn admin-btn--ghost admin-btn--sm">
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
