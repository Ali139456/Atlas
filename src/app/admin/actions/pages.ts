"use server";

import { revalidateCmsContent } from "@/lib/cms/revalidate";
import { writeAuditLog } from "@/lib/admin/audit";
import { slugify } from "@/lib/admin/slug";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export async function savePageAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  const slug = slugify(String(formData.get("slug") ?? ""));
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const seoTitle = String(formData.get("seo_title") ?? "").trim() || null;
  const seoDescription = String(formData.get("seo_description") ?? "").trim() || null;
  const showInNav = formData.get("show_in_nav") === "on";
  const robotsIndex = formData.get("robots_index") === "on";
  const robotsFollow = formData.get("robots_follow") === "on";
  const visibleStatus = formData.get("publish") === "on" ? "published" : "draft";

  if (!slug || !title) throw new Error("Page title and slug are required");

  const payload = {
    slug,
    title,
    description,
    seo_title: seoTitle,
    seo_description: seoDescription,
    show_in_nav: showInNav,
    robots_index: robotsIndex,
    robots_follow: robotsFollow,
    status: visibleStatus as "draft" | "published",
    updated_by: session.adminId,
    updated_at: new Date().toISOString(),
    published_at: visibleStatus === "published" ? new Date().toISOString() : null,
  };

  if (id) {
    const { error } = await client.from("pages").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await client.from("pages").insert(payload);
    if (error) throw new Error(error.message);
  }

  await writeAuditLog({
    adminId: session.adminId,
    action: id ? "page_updated" : "page_created",
    entityType: "page",
    entityId: id || undefined,
    entityName: title,
  });

  revalidateCmsContent(["cms-home-sections"]);
}

export async function deletePageAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing page id");

  const { data: page } = await client.from("pages").select("is_system, title").eq("id", id).maybeSingle();
  if (page?.is_system) throw new Error("System pages cannot be deleted");

  await client.from("pages").delete().eq("id", id);
  await writeAuditLog({
    adminId: session.adminId,
    action: "page_deleted",
    entityType: "page",
    entityId: id,
    entityName: page?.title ?? id,
  });
}
