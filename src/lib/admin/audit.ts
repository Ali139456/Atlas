import { createServiceRoleClient } from "@/lib/supabase/admin";

type AuditInput = {
  adminId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  entityName?: string | null;
  metadata?: Record<string, unknown>;
};

export async function writeAuditLog(input: AuditInput) {
  const admin = createServiceRoleClient();
  if (!admin) return;

  await admin.from("audit_logs").insert({
    admin_id: input.adminId ?? null,
    action: input.action,
    entity_type: input.entityType,
    entity_id: input.entityId ?? null,
    entity_name: input.entityName ?? null,
    metadata: input.metadata ?? {},
  });
}
