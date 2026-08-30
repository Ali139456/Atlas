import { ChangePasswordForm } from "@/components/admin/change-password-form";
import { AdminFieldForm } from "@/components/admin/admin-field-form";
import { AdminSavePublishForm } from "@/components/admin/admin-save-publish-form";
import { AdminSubmitForm } from "@/components/admin/admin-submit-form";
import { siteSettingFieldSchemas } from "@/lib/admin/field-schemas";
import {
  publishAllSettingsAction,
  publishSiteSettingAction,
  saveSiteSettingFieldsAction,
} from "@/app/admin/actions/settings";
import { createServiceRoleClient } from "@/lib/supabase/admin";

const SITE_FIELDS: Record<string, { key: string; label: string }[]> = {
  site: [
    { key: "brand", label: "Company name" },
    { key: "email", label: "Email" },
    { key: "tagline", label: "Tagline" },
    { key: "phone", label: "Primary phone" },
    { key: "phoneAlt", label: "Secondary phone" },
    { key: "addressLine1", label: "Address" },
    { key: "logo", label: "Logo URL" },
  ],
  site_cta: [
    { key: "label", label: "CTA label" },
    { key: "href", label: "CTA URL" },
  ],
};

export default async function AdminSettingsPage() {
  const client = createServiceRoleClient();
  const { data: settings } = client
    ? await client.from("site_settings").select("key, value, draft_value, updated_at").order("key")
    : { data: [] };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Global Settings</h1>
          <p>Company info, default CTA, anchors, and admin account security.</p>
        </div>
        <AdminSubmitForm
          action={publishAllSettingsAction}
          loadingMessage="Publishing all settings…"
          successMessage="All settings published"
        >
          <button type="submit" className="admin-btn admin-btn--primary">
            Publish all setting drafts
          </button>
        </AdminSubmitForm>
      </div>

      {(settings ?? [])
        .filter((row) => row.key !== "cms_bootstrapped")
        .map((row) => {
        const value = {
          ...((row.value as Record<string, string>) ?? {}),
          ...((row.draft_value as Record<string, string>) ?? {}),
        };
        const fields = SITE_FIELDS[row.key];
        const schemaFields = siteSettingFieldSchemas[row.key];

        if (fields || schemaFields) {
          return (
            <section key={row.key} className="admin-panel">
              <h2>{row.key}</h2>
              <AdminSavePublishForm
                saveAction={saveSiteSettingFieldsAction}
                publishAction={publishSiteSettingAction}
                className="admin-form-grid"
                saveSuccessMessage="Setting draft saved"
                publishSuccessMessage="Setting published"
              >
                <input type="hidden" name="key" value={row.key} />
                {schemaFields ? (
                  <AdminFieldForm fields={schemaFields} values={value} prefix="field_" />
                ) : (
                  fields!.map((field) => (
                    <label key={field.key} className="admin-field">
                      {field.label}
                      <input
                        type="text"
                        name={`field_${field.key}`}
                        defaultValue={value[field.key] ?? ""}
                      />
                    </label>
                  ))
                )}
              </AdminSavePublishForm>
            </section>
          );
        }

        return null;
      })}

      <section className="admin-panel">
        <h2>Change password</h2>
        <ChangePasswordForm />
      </section>
    </div>
  );
}
