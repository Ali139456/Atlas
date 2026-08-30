import {
  buildContentFromFields,
  getSectionItemFields,
} from "@/lib/admin/field-schemas";
import { writeAuditLog } from "@/lib/admin/audit";
import { revalidateSectionItemPage } from "@/lib/admin/section-revalidate";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export async function persistSectionItemDraft(
  formData: FormData,
  adminId: string,
  options?: { audit?: boolean },
) {
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing item id");

  const itemType = String(formData.get("item_type") ?? "");
  const fields = getSectionItemFields(itemType, { item_type: itemType });
  const content = {
    ...buildContentFromFields(fields, formData, {}, "item_"),
    item_type: itemType,
  };

  const { data, error } = await client
    .from("section_items")
    .update({
      content,
      draft_content: content,
      status: "draft",
      visible: formData.get("visible") === "on",
      updated_by: adminId,
    })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Item not found");

  if (options?.audit !== false) {
    void writeAuditLog({
      adminId,
      action: "section_item_saved",
      entityType: "section_item",
      entityId: id,
    });
  }

  return content;
}

export async function publishSectionItem(formData: FormData, adminId: string) {
  const content = await persistSectionItemDraft(formData, adminId, { audit: false });

  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const { data, error } = await client
    .from("section_items")
    .update({
      content,
      draft_content: null,
      status: "published",
      visible: formData.get("visible") === "on",
      updated_by: adminId,
    })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Item not found");

  void writeAuditLog({
    adminId,
    action: "section_item_published",
    entityType: "section_item",
    entityId: id,
  });

  await revalidateSectionItemPage(id);

  return content;
}
