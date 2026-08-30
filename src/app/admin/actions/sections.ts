"use server";

import { writeAuditLog } from "@/lib/admin/audit";
import { persistSectionItemDraft } from "@/lib/admin/save-section-item";
import { revalidateSectionPage } from "@/lib/admin/section-revalidate";
import { sanitizeRichHtml } from "@/lib/cms/sanitize";
import {
  buildContentFromFields,
  getSectionFields,
  type AdminField,
} from "@/lib/admin/field-schemas";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createServiceRoleClient } from "@/lib/supabase/admin";

function applyRichTextSanitize(content: Record<string, unknown>, fields: AdminField[]) {
  for (const field of fields) {
    if (field.type === "rich") {
      const raw = content[field.key];
      if (typeof raw === "string") content[field.key] = sanitizeRichHtml(raw);
    }
    if (field.type === "group" && content[field.key] && typeof content[field.key] === "object") {
      applyRichTextSanitize(content[field.key] as Record<string, unknown>, field.fields);
    }
  }
}

function buildSectionDraftContent(sectionKey: string, formData: FormData, existing: Record<string, unknown>) {
  const fields = getSectionFields(sectionKey);
  const next = buildContentFromFields(fields, formData, existing, "field_");
  applyRichTextSanitize(next, fields);
  return next;
}

export async function saveSectionDraftAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing section id");

  const { data: section } = await client
    .from("page_sections")
    .select("id, section_key, content")
    .eq("id", id)
    .maybeSingle();

  if (!section) throw new Error("Section not found");

  const draftContent = buildSectionDraftContent(
    section.section_key,
    formData,
    (section.content as Record<string, unknown>) ?? {},
  );

  const { error } = await client
    .from("page_sections")
    .update({
      draft_content: draftContent,
      status: "draft",
      visible: formData.get("visible") === "on",
      updated_by: session.adminId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  void writeAuditLog({
    adminId: session.adminId,
    action: "section_draft_saved",
    entityType: "page_section",
    entityId: id,
    entityName: section.section_key,
  });
}

export async function publishSectionAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing section id");

  const { data: section } = await client
    .from("page_sections")
    .select("id, section_key, content, draft_content")
    .eq("id", id)
    .maybeSingle();

  if (!section) throw new Error("Section not found");

  const content =
    (section.draft_content as Record<string, unknown> | null) ??
    buildSectionDraftContent(
      section.section_key,
      formData,
      (section.content as Record<string, unknown>) ?? {},
    );

  const { error: sectionError } = await client
    .from("page_sections")
    .update({
      content,
      draft_content: null,
      status: "published",
      visible: formData.get("visible") === "on",
      published_at: new Date().toISOString(),
      updated_by: session.adminId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (sectionError) throw new Error(sectionError.message);

  const { data: draftItems } = await client
    .from("section_items")
    .select("id, draft_content, content")
    .eq("section_id", id)
    .eq("status", "draft");

  for (const item of draftItems ?? []) {
    const nextContent = (item.draft_content as Record<string, unknown> | null) ?? item.content;
    await client
      .from("section_items")
      .update({
        content: nextContent,
        draft_content: null,
        status: "published",
        updated_by: session.adminId,
      })
      .eq("id", item.id);
  }

  void writeAuditLog({
    adminId: session.adminId,
    action: "section_published",
    entityType: "page_section",
    entityId: id,
    entityName: section.section_key,
  });

  await revalidateSectionPage(id);
}

export async function reorderSectionAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  if (!id || !["up", "down"].includes(direction)) throw new Error("Invalid reorder");

  const { data: current } = await client
    .from("page_sections")
    .select("id, page_id, sort_order")
    .eq("id", id)
    .maybeSingle();

  if (!current) throw new Error("Section not found");

  const { data: siblings } = await client
    .from("page_sections")
    .select("id, sort_order")
    .eq("page_id", current.page_id)
    .order("sort_order", { ascending: true });

  const list = siblings ?? [];
  const index = list.findIndex((row) => row.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapIndex < 0 || swapIndex >= list.length) return;

  const a = list[index];
  const b = list[swapIndex];

  await client.from("page_sections").update({ sort_order: b.sort_order }).eq("id", a.id);
  await client.from("page_sections").update({ sort_order: a.sort_order }).eq("id", b.id);

  void writeAuditLog({
    adminId: session.adminId,
    action: "section_reordered",
    entityType: "page_section",
    entityId: id,
    entityName: direction,
  });
}

export async function saveSectionItemAction(formData: FormData) {
  const session = await requireAdmin();
  await persistSectionItemDraft(formData, session.adminId);
}

export async function reorderSectionItemAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  if (!id || !["up", "down"].includes(direction)) throw new Error("Invalid reorder");

  const { data: current } = await client
    .from("section_items")
    .select("id, section_id, sort_order")
    .eq("id", id)
    .maybeSingle();

  if (!current) throw new Error("Item not found");

  const { data: siblings } = await client
    .from("section_items")
    .select("id, sort_order")
    .eq("section_id", current.section_id)
    .order("sort_order", { ascending: true });

  const list = siblings ?? [];
  const index = list.findIndex((row) => row.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapIndex < 0 || swapIndex >= list.length) return;

  const a = list[index];
  const b = list[swapIndex];
  await client.from("section_items").update({ sort_order: b.sort_order }).eq("id", a.id);
  await client.from("section_items").update({ sort_order: a.sort_order }).eq("id", b.id);
}

export async function toggleSectionVisibilityAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const visible = formData.get("visible") === "true";
  if (!id) throw new Error("Missing section id");

  await client.from("page_sections").update({ visible, updated_by: session.adminId }).eq("id", id);
  void writeAuditLog({
    adminId: session.adminId,
    action: visible ? "section_shown" : "section_hidden",
    entityType: "page_section",
    entityId: id,
  });
}
