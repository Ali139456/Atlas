import { AdminReorderButtons } from "@/components/admin/admin-reorder-buttons";
import { AdminSubmitForm } from "@/components/admin/admin-submit-form";
import {
  deleteFormOptionAction,
  reorderFormOptionAction,
  saveFormOptionAction,
} from "@/app/admin/actions/forms";
import { createServiceRoleClient } from "@/lib/supabase/admin";

const FIELD_GROUPS = [
  { key: "industry", label: "Industry dropdown" },
  { key: "inquiry_type", label: "Nature of inquiry dropdown" },
  { key: "company_size", label: "Company size dropdown" },
];

export default async function AdminFormOptionsPage() {
  const client = createServiceRoleClient();
  const { data: options } = client
    ? await client.from("form_field_options").select("*").order("sort_order", { ascending: true })
    : { data: [] };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Form options</h1>
          <p>Contact form dropdown values.</p>
        </div>
      </div>

      {FIELD_GROUPS.map((group) => {
        const rows = (options ?? []).filter((row) => row.field_key === group.key);
        return (
          <section key={group.key} className="admin-panel">
            <h2>{group.label}</h2>
            {rows.map((row) => (
              <AdminSubmitForm
                key={row.id}
                action={saveFormOptionAction}
                deleteAction={deleteFormOptionAction}
                className="admin-inline-form admin-item-card"
                successMessage="Option saved"
                deleteSuccessMessage="Option deleted"
              >
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="field_key" value={group.key} />
                <input type="text" name="label" defaultValue={row.label} className="admin-field-input" />
                <label className="admin-check">
                  <input type="checkbox" name="visible" defaultChecked={row.visible} /> Visible
                </label>
                <AdminReorderButtons
                  id={row.id}
                  action={reorderFormOptionAction}
                  extraFields={{ field_key: group.key }}
                />
                <button type="submit" className="admin-btn admin-btn--ghost">
                  Save
                </button>
                <button type="submit" data-admin-intent="delete" className="admin-btn admin-btn--danger">
                  Delete
                </button>
              </AdminSubmitForm>
            ))}
            <AdminSubmitForm
              action={saveFormOptionAction}
              className="admin-inline-form admin-item-card"
              successMessage="Option added"
            >
              <input type="hidden" name="field_key" value={group.key} />
              <input type="text" name="label" placeholder="New option" required className="admin-field-input" />
              <button type="submit" className="admin-btn admin-btn--ghost">
                Add option
              </button>
            </AdminSubmitForm>
          </section>
        );
      })}
    </div>
  );
}
