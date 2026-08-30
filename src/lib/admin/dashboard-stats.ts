import { createServiceRoleClient } from "@/lib/supabase/admin";

export async function getAdminDashboardStats() {
  const client = createServiceRoleClient();
  if (!client) {
    return {
      pages: 0,
      services: 0,
      industries: 0,
      inquiries: 0,
      recentInquiries: [] as Array<{
        id: string;
        name: string;
        email: string;
        created_at: string;
        status: string;
      }>,
      recentAudit: [] as Array<{
        id: string;
        action: string;
        entity_type: string;
        entity_name: string | null;
        created_at: string;
      }>,
    };
  }

  const [
    { count: pages },
    { count: services },
    { count: industries },
    { count: inquiries },
    { data: recentInquiries },
    { data: recentAudit },
  ] = await Promise.all([
    client.from("pages").select("*", { count: "exact", head: true }),
    client.from("services").select("*", { count: "exact", head: true }),
    client.from("industries").select("*", { count: "exact", head: true }),
    client.from("contact_inquiries").select("*", { count: "exact", head: true }),
    client
      .from("contact_inquiries")
      .select("id, name, email, created_at, status")
      .order("created_at", { ascending: false })
      .limit(5),
    client
      .from("audit_logs")
      .select("id, action, entity_type, entity_name, created_at")
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  return {
    pages: pages ?? 0,
    services: services ?? 0,
    industries: industries ?? 0,
    inquiries: inquiries ?? 0,
    recentInquiries: recentInquiries ?? [],
    recentAudit: recentAudit ?? [],
  };
}
