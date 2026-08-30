"use server";

import { revalidateCmsContent } from "@/lib/cms/revalidate";
import { writeAuditLog } from "@/lib/admin/audit";
import { slugify } from "@/lib/admin/slug";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export async function saveNavigationItemAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const label = String(formData.get("label") ?? "").trim();
  const linkType = String(formData.get("link_type") ?? "url");
  const pageSlug = String(formData.get("page_slug") ?? "").trim() || null;
  const url = String(formData.get("url") ?? "").trim() || null;
  const anchor = String(formData.get("anchor") ?? "").trim() || null;
  const parentId = String(formData.get("parent_id") ?? "").trim() || null;
  const visible = formData.get("visible") === "on";
  const megaMenu = formData.get("mega_menu") === "on";
  const openInNewTab = formData.get("open_in_new_tab") === "on";

  if (!label) throw new Error("Label is required");

  const payload = {
    label,
    link_type: linkType,
    page_slug: pageSlug,
    url,
    anchor,
    parent_id: parentId,
    visible,
    mega_menu: megaMenu,
    open_in_new_tab: openInNewTab,
    updated_by: session.adminId,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await client.from("navigation_items").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
    await writeAuditLog({
      adminId: session.adminId,
      action: "navigation_updated",
      entityType: "navigation_item",
      entityId: id,
      entityName: label,
    });
  } else {
    const { data: maxRow } = await client
      .from("navigation_items")
      .select("sort_order")
      .is("parent_id", parentId)
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { error } = await client.from("navigation_items").insert({
      ...payload,
      sort_order: (maxRow?.sort_order ?? -1) + 1,
      status: "published",
    });
    if (error) throw new Error(error.message);
    await writeAuditLog({
      adminId: session.adminId,
      action: "navigation_created",
      entityType: "navigation_item",
      entityName: label,
    });
  }

  revalidateCmsContent(["cms-navigation"]);
}

export async function deleteNavigationItemAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing navigation item");

  const { error } = await client.from("navigation_items").delete().eq("id", id);
  if (error) throw new Error(error.message);

  await writeAuditLog({
    adminId: session.adminId,
    action: "navigation_deleted",
    entityType: "navigation_item",
    entityId: id,
  });

  revalidateCmsContent(["cms-navigation"]);
}

export async function reorderNavigationItemAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  if (!id || !["up", "down"].includes(direction)) throw new Error("Invalid reorder");

  const { data: current } = await client
    .from("navigation_items")
    .select("id, parent_id, sort_order")
    .eq("id", id)
    .maybeSingle();

  if (!current) throw new Error("Navigation item not found");

  let query = client.from("navigation_items").select("id, sort_order").order("sort_order");
  query = current.parent_id ? query.eq("parent_id", current.parent_id) : query.is("parent_id", null);

  const { data: siblings } = await query;
  const list = siblings ?? [];
  const index = list.findIndex((row) => row.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapIndex < 0 || swapIndex >= list.length) return;

  const a = list[index];
  const b = list[swapIndex];
  await client.from("navigation_items").update({ sort_order: b.sort_order }).eq("id", a.id);
  await client.from("navigation_items").update({ sort_order: a.sort_order }).eq("id", b.id);

  await writeAuditLog({
    adminId: session.adminId,
    action: "navigation_reordered",
    entityType: "navigation_item",
    entityId: id,
    entityName: direction,
  });

  revalidateCmsContent(["cms-navigation"]);
}

export async function toggleNavigationVisibilityAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const visible = formData.get("visible") === "true";
  if (!id) throw new Error("Missing navigation item");

  const { error } = await client
    .from("navigation_items")
    .update({ visible, updated_by: session.adminId })
    .eq("id", id);

  if (error) throw new Error(error.message);

  await writeAuditLog({
    adminId: session.adminId,
    action: visible ? "navigation_item_shown" : "navigation_item_hidden",
    entityType: "navigation_item",
    entityId: id,
  });

  revalidateCmsContent(["cms-navigation"]);
}
