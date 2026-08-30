"use server";

import { revalidateCmsContent } from "@/lib/cms/revalidate";
import { sanitizeRichHtml } from "@/lib/cms/sanitize";
import { writeAuditLog } from "@/lib/admin/audit";
import { slugify } from "@/lib/admin/slug";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createServiceRoleClient } from "@/lib/supabase/admin";

function readIndustryForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  return {
    slug: slugify(slugInput || title),
    short_title: String(formData.get("short_title") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    description: sanitizeRichHtml(String(formData.get("description") ?? "")),
    summary: sanitizeRichHtml(String(formData.get("summary") ?? "")),
    card_image: String(formData.get("card_image") ?? "").trim() || null,
    hero_image: String(formData.get("hero_image") ?? "").trim() || null,
    dashboard_image: String(formData.get("dashboard_image") ?? "").trim() || null,
    seo_title: String(formData.get("seo_title") ?? "").trim() || null,
    seo_description: String(formData.get("seo_description") ?? "").trim() || null,
    cta_label: String(formData.get("cta_label") ?? "").trim() || null,
    cta_url: String(formData.get("cta_url") ?? "").trim() || null,
    featured: formData.get("featured") === "on",
    visible: formData.get("visible") === "on",
  };
}

export async function saveIndustryAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const data = readIndustryForm(formData);
  if (!data.slug || !data.title) throw new Error("Title and slug are required");

  const payload = {
    ...data,
    status: "draft" as const,
    updated_by: session.adminId,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await client.from("industries").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data: maxRow } = await client
      .from("industries")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { error } = await client.from("industries").insert({
      ...payload,
      sort_order: (maxRow?.sort_order ?? -1) + 1,
    });
    if (error) throw new Error(error.message);
  }

  await writeAuditLog({
    adminId: session.adminId,
    action: id ? "industry_draft_saved" : "industry_created",
    entityType: "industry",
    entityId: id || undefined,
    entityName: data.title,
  });

  revalidateCmsContent(["cms-industries"]);
}

export async function publishIndustryAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing industry id");

  const data = readIndustryForm(formData);
  const { error } = await client
    .from("industries")
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
    action: "industry_published",
    entityType: "industry",
    entityId: id,
    entityName: data.title,
  });

  revalidateCmsContent(["cms-industries"]);
}

export async function deleteIndustryAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing industry id");

  await client.from("industries").delete().eq("id", id);
  await writeAuditLog({
    adminId: session.adminId,
    action: "industry_deleted",
    entityType: "industry",
    entityId: id,
  });
  revalidateCmsContent(["cms-industries"]);
}

export async function reorderIndustryAction(formData: FormData) {
  await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  if (!id || !["up", "down"].includes(direction)) throw new Error("Invalid reorder");

  const { data: rows } = await client
    .from("industries")
    .select("id, sort_order")
    .order("sort_order", { ascending: true });

  const list = rows ?? [];
  const index = list.findIndex((row) => row.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapIndex < 0 || swapIndex >= list.length) return;

  const a = list[index];
  const b = list[swapIndex];
  await client.from("industries").update({ sort_order: b.sort_order }).eq("id", a.id);
  await client.from("industries").update({ sort_order: a.sort_order }).eq("id", b.id);
  revalidateCmsContent(["cms-industries"]);
}

export async function saveIndustryHighlightAction(formData: FormData) {
  await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const industryId = String(formData.get("industry_id") ?? "");
  const text = String(formData.get("text") ?? "").trim();
  if (!industryId || !text) throw new Error("Missing highlight text");

  if (id) {
    await client.from("industry_highlights").update({ text }).eq("id", id);
  } else {
    const { data: maxRow } = await client
      .from("industry_highlights")
      .select("sort_order")
      .eq("industry_id", industryId)
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    await client.from("industry_highlights").insert({
      industry_id: industryId,
      text,
      sort_order: (maxRow?.sort_order ?? -1) + 1,
    });
  }
  revalidateCmsContent(["cms-industries"]);
}

export async function deleteIndustryHighlightAction(formData: FormData) {
  await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing highlight id");
  await client.from("industry_highlights").delete().eq("id", id);
  revalidateCmsContent(["cms-industries"]);
}

export async function saveIndustryChallengeAction(formData: FormData) {
  await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const industryId = String(formData.get("industry_id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = sanitizeRichHtml(String(formData.get("description") ?? ""));
  if (!industryId || !title) throw new Error("Missing challenge fields");

  if (id) {
    await client.from("industry_challenges").update({ title, description }).eq("id", id);
  } else {
    const { data: maxRow } = await client
      .from("industry_challenges")
      .select("sort_order")
      .eq("industry_id", industryId)
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    await client.from("industry_challenges").insert({
      industry_id: industryId,
      title,
      description,
      sort_order: (maxRow?.sort_order ?? -1) + 1,
    });
  }
  revalidateCmsContent(["cms-industries"]);
}

export async function deleteIndustryChallengeAction(formData: FormData) {
  await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing challenge id");
  await client.from("industry_challenges").delete().eq("id", id);
  revalidateCmsContent(["cms-industries"]);
}

export async function saveIndustrySolutionAction(formData: FormData) {
  await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const industryId = String(formData.get("industry_id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = sanitizeRichHtml(String(formData.get("description") ?? ""));
  if (!industryId || !title) throw new Error("Missing solution fields");

  if (id) {
    await client.from("industry_solutions").update({ title, description }).eq("id", id);
  } else {
    const { data: maxRow } = await client
      .from("industry_solutions")
      .select("sort_order")
      .eq("industry_id", industryId)
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    await client.from("industry_solutions").insert({
      industry_id: industryId,
      title,
      description,
      sort_order: (maxRow?.sort_order ?? -1) + 1,
    });
  }
  revalidateCmsContent(["cms-industries"]);
}

export async function deleteIndustrySolutionAction(formData: FormData) {
  await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing solution id");
  await client.from("industry_solutions").delete().eq("id", id);
  revalidateCmsContent(["cms-industries"]);
}
