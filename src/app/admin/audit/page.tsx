import { createServiceRoleClient } from "@/lib/supabase/admin";

export default async function AdminAuditPage() {
  const client = createServiceRoleClient();
  const { data: logs } = client
    ? await client
        .from("audit_logs")
        .select("id, action, entity_type, entity_id, entity_name, created_at, admins(username)")
        .order("created_at", { ascending: false })
        .limit(200)
    : { data: [] };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Audit Log</h1>
          <p>Recent admin activity across the CMS.</p>
        </div>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>When</th>
                <th>Admin</th>
                <th>Action</th>
                <th>Entity</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {(logs ?? []).map((row) => {
                const admin = Array.isArray(row.admins) ? row.admins[0] : row.admins;
                return (
                  <tr key={row.id}>
                    <td>{new Date(row.created_at).toLocaleString()}</td>
                    <td>{admin?.username ?? "—"}</td>
                    <td>
                      <span className="admin-badge admin-badge--published">{row.action}</span>
                    </td>
                    <td>{row.entity_type ?? "—"}</td>
                    <td>{row.entity_name ?? row.entity_id ?? "—"}</td>
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
