"use server";

import { revalidateCmsContent } from "@/lib/cms/revalidate";
import { writeAuditLog } from "@/lib/admin/audit";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export async function saveFooterLinkAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const columnId = String(formData.get("column_id") ?? "");
  const label = String(formData.get("label") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  const external = formData.get("external") === "on";
  const visible = formData.get("visible") === "on";

  if (!columnId || !label || !href) throw new Error("Missing footer link fields");

  if (id) {
    await client
      .from("footer_links")
      .update({ label, href, external, visible, status: "published" })
      .eq("id", id);
  } else {
    const { data: maxRow } = await client
      .from("footer_links")
      .select("sort_order")
      .eq("column_id", columnId)
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    await client.from("footer_links").insert({
      column_id: columnId,
      label,
      href,
      external,
      visible,
      sort_order: (maxRow?.sort_order ?? -1) + 1,
      status: "published",
    });
  }

  await writeAuditLog({
    adminId: session.adminId,
    action: "footer_link_saved",
    entityType: "footer_link",
    entityName: label,
  });

  revalidateCmsContent(["cms-footer"]);
}

export async function deleteFooterLinkAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing footer link id");

  await client.from("footer_links").delete().eq("id", id);
  await writeAuditLog({
    adminId: session.adminId,
    action: "footer_link_deleted",
    entityType: "footer_link",
    entityId: id,
  });
  revalidateCmsContent(["cms-footer"]);
}

export async function saveSocialLinkAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const label = String(formData.get("label") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  const icon = String(formData.get("icon") ?? "linkedin").trim();
  const visible = formData.get("visible") === "on";

  if (!label || !href) throw new Error("Missing social link fields");

  if (id) {
    await client
      .from("social_links")
      .update({ label, href, icon, visible, status: "published" })
      .eq("id", id);
  } else {
    const { data: maxRow } = await client
      .from("social_links")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    await client.from("social_links").insert({
      label,
      href,
      icon,
      visible,
      sort_order: (maxRow?.sort_order ?? -1) + 1,
      status: "published",
    });
  }

  await writeAuditLog({
    adminId: session.adminId,
    action: "social_link_saved",
    entityType: "social_link",
    entityName: label,
  });

  revalidateCmsContent(["cms-footer"]);
}

export async function deleteSocialLinkAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing social link id");

  await client.from("social_links").delete().eq("id", id);
  revalidateCmsContent(["cms-footer"]);
}

export async function reorderFooterLinkAction(formData: FormData) {
  await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  const columnId = String(formData.get("column_id") ?? "");
  if (!id || !columnId || !["up", "down"].includes(direction)) throw new Error("Invalid reorder");

  const { data: rows } = await client
    .from("footer_links")
    .select("id, sort_order")
    .eq("column_id", columnId)
    .order("sort_order", { ascending: true });

  const list = rows ?? [];
  const index = list.findIndex((row) => row.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapIndex < 0 || swapIndex >= list.length) return;

  const a = list[index];
  const b = list[swapIndex];
  await client.from("footer_links").update({ sort_order: b.sort_order }).eq("id", a.id);
  await client.from("footer_links").update({ sort_order: a.sort_order }).eq("id", b.id);
  revalidateCmsContent(["cms-footer"]);
}
