import { updateInquiryStatusAction } from "@/app/admin/actions/cms";
import { AdminSubmitForm } from "@/components/admin/admin-submit-form";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export default async function AdminInquiriesPage() {
  const client = createServiceRoleClient();
  const { data: inquiries } = client
    ? await client
        .from("contact_inquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100)
    : { data: [] };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Contact Inquiries</h1>
          <p>Submitted consultation requests from the public website.</p>
        </div>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Industry</th>
                <th>Inquiry</th>
                <th>Status</th>
                <th>Date</th>
                <th className="admin-table-actions">Update</th>
              </tr>
            </thead>
            <tbody>
              {(inquiries ?? []).map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong>{row.name}</strong>
                  </td>
                  <td>{row.email}</td>
                  <td>{row.company ?? "—"}</td>
                  <td>{row.industry ?? "—"}</td>
                  <td>{row.inquiry_type ?? row.service ?? "—"}</td>
                  <td>
                    <span className="admin-badge admin-badge--draft">{row.status ?? "new"}</span>
                  </td>
                  <td>{new Date(row.created_at).toLocaleString()}</td>
                  <td className="admin-table-actions">
                    <AdminSubmitForm
                      action={updateInquiryStatusAction}
                      className="admin-inline-form"
                      successMessage="Inquiry status updated"
                    >
                      <input type="hidden" name="id" value={row.id} />
                      <select name="status" defaultValue={row.status ?? "new"} className="admin-select">
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="archived">Archived</option>
                      </select>
                      <button type="submit" className="admin-btn admin-btn--ghost admin-btn--sm">
                        Save
                      </button>
                    </AdminSubmitForm>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {!inquiries?.length ? <p className="admin-muted">No inquiries stored yet.</p> : null}
    </div>
  );
}
