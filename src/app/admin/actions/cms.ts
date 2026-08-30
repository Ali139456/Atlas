"use server";

import { revalidateCmsContent } from "@/lib/cms/revalidate";
import { writeAuditLog } from "@/lib/admin/audit";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export async function publishAllCmsContentAction() {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const { data: settings } = await client
    .from("site_settings")
    .select("key, draft_value")
    .not("draft_value", "is", null);

  for (const row of settings ?? []) {
    await client
      .from("site_settings")
      .update({ value: row.draft_value, draft_value: null, updated_by: session.adminId })
      .eq("key", row.key);
  }

  for (const table of ["page_sections", "section_items", "cta_blocks"] as const) {
    const { data: rows } = await client
      .from(table)
      .select("id, draft_content, content")
      .not("draft_content", "is", null);

    for (const row of rows ?? []) {
      await client
        .from(table)
        .update({
          content: row.draft_content,
          draft_content: null,
          status: "published",
          updated_by: session.adminId,
        })
        .eq("id", row.id);
    }
  }

  const statusTables = [
    "navigation_items",
    "pages",
    "page_sections",
    "section_items",
    "services",
    "service_capabilities",
    "service_outcomes",
    "industries",
    "industry_highlights",
    "industry_challenges",
    "industry_solutions",
    "footer_columns",
    "footer_links",
    "social_links",
    "form_field_options",
    "cta_blocks",
  ] as const;

  for (const table of statusTables) {
    await client
      .from(table)
      .update({ status: "published", updated_by: session.adminId })
      .eq("status", "draft");
  }

  await writeAuditLog({
    adminId: session.adminId,
    action: "publish_all",
    entityType: "cms",
    entityName: "All CMS content",
  });

  revalidateCmsContent(
    [
      "cms-site-settings",
      "cms-navigation",
      "cms-services",
      "cms-industries",
      "cms-home-sections",
      "cms-pricing",
      "cms-form-options",
      "cms-footer",
    ],
    ["/", "/pricing"],
  );
}

export async function updateInquiryStatusAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const allowed = new Set(["new", "read", "in_progress", "resolved", "archived"]);
  if (!id || !allowed.has(status)) throw new Error("Invalid inquiry update");

  const { error } = await client.from("contact_inquiries").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);

  await writeAuditLog({
    adminId: session.adminId,
    action: "inquiry_status_updated",
    entityType: "contact_inquiry",
    entityId: id,
    entityName: status,
  });
}
