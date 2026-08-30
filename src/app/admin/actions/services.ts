"use server";

import { redirect } from "next/navigation";
import { revalidateCmsContent } from "@/lib/cms/revalidate";
import { sanitizeRichHtml } from "@/lib/cms/sanitize";
import { writeAuditLog } from "@/lib/admin/audit";
import { slugify } from "@/lib/admin/slug";
import { adminUrl } from "@/lib/admin/config";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createServiceRoleClient } from "@/lib/supabase/admin";

function readServiceForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  return {
    slug: slugify(slugInput || title),
    index_label: String(formData.get("index_label") ?? "01").trim(),
    short_title: String(formData.get("short_title") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    icon: String(formData.get("icon") ?? "bookkeeping").trim(),
    description: String(formData.get("description") ?? "").trim(),
    summary: sanitizeRichHtml(String(formData.get("summary") ?? "")),
    overview: sanitizeRichHtml(String(formData.get("overview") ?? "")),
    seo_title: String(formData.get("seo_title") ?? "").trim() || null,
    seo_description: String(formData.get("seo_description") ?? "").trim() || null,
    cta_label: String(formData.get("cta_label") ?? "").trim() || null,
    cta_url: String(formData.get("cta_url") ?? "").trim() || null,
    featured: formData.get("featured") === "on",
    visible: formData.get("visible") === "on",
  };
}

export async function saveServiceAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const data = readServiceForm(formData);
  if (!data.slug || !data.title || !data.short_title) throw new Error("Title and slug are required");

  const payload = {
    ...data,
    status: "draft" as const,
    updated_by: session.adminId,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await client.from("services").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
    await writeAuditLog({
      adminId: session.adminId,
      action: "service_draft_saved",
      entityType: "service",
      entityId: id,
      entityName: data.title,
    });
  } else {
    const { data: maxRow } = await client
      .from("services")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: created, error } = await client
      .from("services")
      .insert({
        ...payload,
        sort_order: (maxRow?.sort_order ?? -1) + 1,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    await writeAuditLog({
      adminId: session.adminId,
      action: "service_created",
      entityType: "service",
      entityId: created.id,
      entityName: data.title,
    });
    revalidateCmsContent(["cms-services"]);
    redirect(adminUrl(`/services/${created.id}`));
  }

  revalidateCmsContent(["cms-services"]);
}

export async function publishServiceAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing service id");

  const data = readServiceForm(formData);
  const { error } = await client
    .from("services")
    .update({
      ...data,
      status: "published",
      published_at: new Date().toISOString(),
      updated_by: session.adminId,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  await writeAuditLog({
    adminId: session.adminId,
    action: "service_published",
    entityType: "service",
    entityId: id,
    entityName: data.title,
  });

  revalidateCmsContent(["cms-services"]);
}

export async function deleteServiceAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing service id");

  const { error } = await client.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);

  await writeAuditLog({
    adminId: session.adminId,
    action: "service_deleted",
    entityType: "service",
    entityId: id,
  });

  revalidateCmsContent(["cms-services"]);
}

export async function reorderServiceAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  if (!id || !["up", "down"].includes(direction)) throw new Error("Invalid reorder");

  const { data: rows } = await client
    .from("services")
    .select("id, sort_order")
    .order("sort_order", { ascending: true });

  const list = rows ?? [];
  const index = list.findIndex((row) => row.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapIndex < 0 || swapIndex >= list.length) return;

  const a = list[index];
  const b = list[swapIndex];
  await client.from("services").update({ sort_order: b.sort_order }).eq("id", a.id);
  await client.from("services").update({ sort_order: a.sort_order }).eq("id", b.id);

  revalidateCmsContent(["cms-services"]);
}

export async function saveServiceCapabilityAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const serviceId = String(formData.get("service_id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = sanitizeRichHtml(String(formData.get("description") ?? ""));

  if (!serviceId || !title) throw new Error("Missing capability fields");

  if (id) {
    await client
      .from("service_capabilities")
      .update({ title, description, status: "published" })
      .eq("id", id);
  } else {
    const { data: maxRow } = await client
      .from("service_capabilities")
      .select("sort_order")
      .eq("service_id", serviceId)
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    await client.from("service_capabilities").insert({
      service_id: serviceId,
      title,
      description,
      sort_order: (maxRow?.sort_order ?? -1) + 1,
      status: "published",
    });
  }

  await writeAuditLog({
    adminId: session.adminId,
    action: "service_capability_saved",
    entityType: "service",
    entityId: serviceId,
    entityName: title,
  });

  revalidateCmsContent(["cms-services"]);
}

export async function deleteServiceCapabilityAction(formData: FormData) {
  await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing capability id");
  await client.from("service_capabilities").delete().eq("id", id);
  revalidateCmsContent(["cms-services"]);
}

export async function saveServiceOutcomeAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const serviceId = String(formData.get("service_id") ?? "");
  const text = String(formData.get("text") ?? "").trim();
  if (!serviceId || !text) throw new Error("Missing outcome text");

  if (id) {
    await client.from("service_outcomes").update({ text, status: "published" }).eq("id", id);
  } else {
    const { data: maxRow } = await client
      .from("service_outcomes")
      .select("sort_order")
      .eq("service_id", serviceId)
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    await client.from("service_outcomes").insert({
      service_id: serviceId,
      text,
      sort_order: (maxRow?.sort_order ?? -1) + 1,
      status: "published",
    });
  }

  await writeAuditLog({
    adminId: session.adminId,
    action: "service_outcome_saved",
    entityType: "service",
    entityId: serviceId,
    entityName: text,
  });

  revalidateCmsContent(["cms-services"]);
}

export async function deleteServiceOutcomeAction(formData: FormData) {
  await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing outcome id");
  await client.from("service_outcomes").delete().eq("id", id);
  revalidateCmsContent(["cms-services"]);
}
