import { AdminReorderButtons } from "@/components/admin/admin-reorder-buttons";
import { AdminSubmitForm } from "@/components/admin/admin-submit-form";
import {
  deleteFooterLinkAction,
  deleteSocialLinkAction,
  reorderFooterLinkAction,
  saveFooterLinkAction,
  saveSocialLinkAction,
} from "@/app/admin/actions/footer";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export default async function AdminFooterPage() {
  const client = createServiceRoleClient();
  const [{ data: columns }, { data: social }, { data: links }] = client
    ? await Promise.all([
        client.from("footer_columns").select("*").order("sort_order", { ascending: true }),
        client.from("social_links").select("*").order("sort_order", { ascending: true }),
        client.from("footer_links").select("*").order("sort_order", { ascending: true }),
      ])
    : [{ data: [] }, { data: [] }, { data: [] }];

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Footer</h1>
          <p>Footer columns, links, and social profiles.</p>
        </div>
      </div>

      {(columns ?? []).map((col) => {
        const colLinks = (links ?? []).filter((link) => link.column_id === col.id);
        return (
          <section key={col.id} className="admin-panel">
            <h2>{col.title}</h2>
            {colLinks.map((link) => (
              <AdminSubmitForm
                key={link.id}
                action={saveFooterLinkAction}
                deleteAction={deleteFooterLinkAction}
                className="admin-form-grid admin-item-card"
                successMessage="Footer link saved"
                deleteSuccessMessage="Footer link deleted"
              >
                <input type="hidden" name="id" value={link.id} />
                <input type="hidden" name="column_id" value={col.id} />
                <label className="admin-field">
                  Label
                  <input type="text" name="label" defaultValue={link.label} />
                </label>
                <label className="admin-field">
                  URL
                  <input type="text" name="href" defaultValue={link.href} />
                </label>
                <label className="admin-check">
                  <input type="checkbox" name="external" defaultChecked={link.external} /> External
                </label>
                <label className="admin-check">
                  <input type="checkbox" name="visible" defaultChecked={link.visible} /> Visible
                </label>
                <div className="admin-toolbar">
                  <AdminReorderButtons
                    id={link.id}
                    action={reorderFooterLinkAction}
                    extraFields={{ column_id: col.id }}
                  />
                  <button type="submit" className="admin-btn admin-btn--ghost">
                    Save
                  </button>
                  <button type="submit" data-admin-intent="delete" className="admin-btn admin-btn--danger">
                    Delete
                  </button>
                </div>
              </AdminSubmitForm>
            ))}
            <AdminSubmitForm
              action={saveFooterLinkAction}
              className="admin-form-grid admin-item-card"
              successMessage="Footer link added"
            >
              <input type="hidden" name="column_id" value={col.id} />
              <label className="admin-field">
                New link label
                <input type="text" name="label" required />
              </label>
              <label className="admin-field">
                URL
                <input type="text" name="href" required />
              </label>
              <button type="submit" className="admin-btn admin-btn--ghost">
                Add link
              </button>
            </AdminSubmitForm>
          </section>
        );
      })}

      <section className="admin-panel">
        <h2>Social links</h2>
        {(social ?? []).map((item) => (
          <AdminSubmitForm
            key={item.id}
            action={saveSocialLinkAction}
            deleteAction={deleteSocialLinkAction}
            className="admin-form-grid admin-item-card"
            successMessage="Social link saved"
            deleteSuccessMessage="Social link deleted"
          >
            <input type="hidden" name="id" value={item.id} />
            <label className="admin-field">
              Label
              <input type="text" name="label" defaultValue={item.label} />
            </label>
            <label className="admin-field">
              URL
              <input type="text" name="href" defaultValue={item.href} />
            </label>
            <label className="admin-field">
              Icon
              <select name="icon" defaultValue={item.icon}>
                <option value="linkedin">linkedin</option>
                <option value="x">x</option>
                <option value="facebook">facebook</option>
                <option value="instagram">instagram</option>
              </select>
            </label>
            <div className="admin-toolbar">
              <button type="submit" className="admin-btn admin-btn--ghost">
                Save
              </button>
              <button type="submit" data-admin-intent="delete" className="admin-btn admin-btn--danger">
                Delete
              </button>
            </div>
          </AdminSubmitForm>
        ))}
        <AdminSubmitForm
          action={saveSocialLinkAction}
          className="admin-form-grid admin-item-card"
          successMessage="Social link added"
        >
          <label className="admin-field">
            Label
            <input type="text" name="label" required />
          </label>
          <label className="admin-field">
            URL
            <input type="text" name="href" required />
          </label>
          <label className="admin-field">
            Icon
            <select name="icon" defaultValue="linkedin">
              <option value="linkedin">linkedin</option>
              <option value="x">x</option>
              <option value="facebook">facebook</option>
              <option value="instagram">instagram</option>
            </select>
          </label>
          <button type="submit" className="admin-btn admin-btn--ghost">
            Add social link
          </button>
        </AdminSubmitForm>
      </section>
    </div>
  );
}
