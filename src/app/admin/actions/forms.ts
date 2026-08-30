"use server";

import { revalidateCmsContent } from "@/lib/cms/revalidate";
import { writeAuditLog } from "@/lib/admin/audit";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export async function saveFormOptionAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const fieldKey = String(formData.get("field_key") ?? "").trim();
  const label = String(formData.get("label") ?? "").trim();
  const visible = formData.get("visible") === "on";

  if (!fieldKey || !label) throw new Error("Missing form option fields");

  if (id) {
    await client
      .from("form_field_options")
      .update({ field_key: fieldKey, label, visible, status: "published" })
      .eq("id", id);
  } else {
    const { data: maxRow } = await client
      .from("form_field_options")
      .select("sort_order")
      .eq("field_key", fieldKey)
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    await client.from("form_field_options").insert({
      field_key: fieldKey,
      label,
      visible,
      sort_order: (maxRow?.sort_order ?? -1) + 1,
      status: "published",
    });
  }

  await writeAuditLog({
    adminId: session.adminId,
    action: "form_option_saved",
    entityType: "form_field_option",
    entityName: `${fieldKey}:${label}`,
  });

  revalidateCmsContent(["cms-form-options"]);
}

export async function deleteFormOptionAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing form option id");

  await client.from("form_field_options").delete().eq("id", id);
  await writeAuditLog({
    adminId: session.adminId,
    action: "form_option_deleted",
    entityType: "form_field_option",
    entityId: id,
  });
  revalidateCmsContent(["cms-form-options"]);
}

export async function reorderFormOptionAction(formData: FormData) {
  await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const fieldKey = String(formData.get("field_key") ?? "");
  const direction = String(formData.get("direction") ?? "");
  if (!id || !fieldKey || !["up", "down"].includes(direction)) throw new Error("Invalid reorder");

  const { data: rows } = await client
    .from("form_field_options")
    .select("id, sort_order")
    .eq("field_key", fieldKey)
    .order("sort_order", { ascending: true });

  const list = rows ?? [];
  const index = list.findIndex((row) => row.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapIndex < 0 || swapIndex >= list.length) return;

  const a = list[index];
  const b = list[swapIndex];
  await client.from("form_field_options").update({ sort_order: b.sort_order }).eq("id", a.id);
  await client.from("form_field_options").update({ sort_order: a.sort_order }).eq("id", b.id);
  revalidateCmsContent(["cms-form-options"]);
}
