"use server";

import { revalidateCmsContent } from "@/lib/cms/revalidate";
import { writeAuditLog } from "@/lib/admin/audit";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export async function saveSiteSettingAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const key = String(formData.get("key") ?? "").trim();
  const json = String(formData.get("value") ?? "").trim();
  if (!key) throw new Error("Missing setting key");

  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error("Invalid JSON value");
  }

  const { error } = await client
    .from("site_settings")
    .upsert({
      key,
      draft_value: parsed,
      updated_by: session.adminId,
      updated_at: new Date().toISOString(),
    });

  if (error) throw new Error(error.message);

  await writeAuditLog({
    adminId: session.adminId,
    action: "settings_draft_saved",
    entityType: "site_settings",
    entityName: key,
  });
}

export async function publishSiteSettingAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const key = String(formData.get("key") ?? "").trim();
  if (!key) throw new Error("Missing setting key");

  const { data: row } = await client
    .from("site_settings")
    .select("draft_value, value")
    .eq("key", key)
    .maybeSingle();

  const nextValue = row?.draft_value ?? row?.value;
  const { error } = await client
    .from("site_settings")
    .upsert({
      key,
      value: nextValue,
      draft_value: null,
      updated_by: session.adminId,
      updated_at: new Date().toISOString(),
    });

  if (error) throw new Error(error.message);

  await writeAuditLog({
    adminId: session.adminId,
    action: "settings_published",
    entityType: "site_settings",
    entityName: key,
  });

  revalidateCmsContent(["cms-site-settings"]);
}

export async function saveSiteSettingFieldsAction(formData: FormData) {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const key = String(formData.get("key") ?? "").trim();
  if (!key) throw new Error("Missing setting key");

  const { data: row } = await client
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();

  const current = (row?.value as Record<string, unknown>) ?? {};
  const next: Record<string, unknown> = { ...current };

  for (const [field, value] of formData.entries()) {
    if (!field.startsWith("field_")) continue;
    next[field.replace(/^field_/, "")] = String(value);
  }

  const { error } = await client.from("site_settings").upsert({
    key,
    draft_value: next,
    updated_by: session.adminId,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);

  await writeAuditLog({
    adminId: session.adminId,
    action: "settings_draft_saved",
    entityType: "site_settings",
    entityName: key,
  });
}

export async function publishAllSettingsAction() {
  const session = await requireAdmin();
  const client = createServiceRoleClient();
  if (!client) throw new Error("Database not configured");

  const { data: rows } = await client
    .from("site_settings")
    .select("key, draft_value, value")
    .not("draft_value", "is", null);

  for (const row of rows ?? []) {
    await client
      .from("site_settings")
      .update({
        value: row.draft_value,
        draft_value: null,
        updated_by: session.adminId,
      })
      .eq("key", row.key);
  }

  await writeAuditLog({
    adminId: session.adminId,
    action: "settings_published_all",
    entityType: "site_settings",
    entityName: "all",
  });

  revalidateCmsContent(["cms-site-settings"]);
}
