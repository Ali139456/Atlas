import { AdminBadge } from "@/components/admin/admin-badge";
import { AdminReorderButtons } from "@/components/admin/admin-reorder-buttons";
import { AdminSubmitForm } from "@/components/admin/admin-submit-form";
import {
  deleteNavigationItemAction,
  reorderNavigationItemAction,
  saveNavigationItemAction,
  toggleNavigationVisibilityAction,
} from "@/app/admin/actions/navigation";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export default async function AdminNavigationPage() {
  const client = createServiceRoleClient();
  const { data: items } = client
    ? await client
        .from("navigation_items")
        .select("*")
        .order("sort_order", { ascending: true })
    : { data: [] };

  const roots = (items ?? []).filter((i) => !i.parent_id);
  const children = (items ?? []).filter((i) => i.parent_id);
  const dropdownParents = roots.filter(
    (i) => i.link_type === "dropdown" || i.label === "Services" || i.label === "Industry",
  );

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Navigation</h1>
          <p>Build the navbar and dropdown menus. Reorder items with the arrow controls.</p>
        </div>
      </div>

      <section className="admin-panel">
        <h2>Add navbar item</h2>
        <AdminSubmitForm
          action={saveNavigationItemAction}
          className="admin-form-grid"
          loadingMessage="Adding item…"
          successMessage="Navigation item added"
        >
          <label className="admin-field">
            Label
            <input type="text" name="label" required placeholder="e.g. Contact Us" />
          </label>
          <label className="admin-field">
            Link type
            <select name="link_type" defaultValue="url">
              <option value="url">External / custom URL</option>
              <option value="page">Internal page slug</option>
              <option value="anchor">Anchor hash</option>
              <option value="dropdown">Dropdown parent</option>
              <option value="none">Label only</option>
            </select>
          </label>
          <label className="admin-field">
            Page slug
            <input type="text" name="page_slug" placeholder="home, pricing, services/..." />
          </label>
          <label className="admin-field">
            URL
            <input type="text" name="url" placeholder="/#contact or https://..." />
          </label>
          <label className="admin-field">
            Anchor
            <input type="text" name="anchor" placeholder="/#value" />
          </label>
          <label className="admin-field">
            Parent dropdown
            <select name="parent_id" defaultValue="">
              <option value="">Top level</option>
              {dropdownParents.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.label}
                </option>
              ))}
            </select>
          </label>
          <div className="admin-check-row">
            <label className="admin-check">
              <input type="checkbox" name="mega_menu" /> Mega menu (Services)
            </label>
            <label className="admin-check">
              <input type="checkbox" name="open_in_new_tab" /> Open in new tab
            </label>
            <label className="admin-check">
              <input type="checkbox" name="visible" defaultChecked /> Visible
            </label>
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary">
              Add item
            </button>
          </div>
        </AdminSubmitForm>
      </section>

      <div className="admin-table-wrap">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Label</th>
                <th>Type</th>
                <th>Target</th>
                <th>Order</th>
                <th>Visible</th>
                <th className="admin-table-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roots.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.label}</strong>
                  </td>
                  <td>{item.link_type}</td>
                  <td>{item.url ?? item.page_slug ?? item.anchor ?? "—"}</td>
                  <td>{item.sort_order}</td>
                  <td>
                    <AdminBadge value={item.visible} />
                  </td>
                  <td className="admin-table-actions">
                    <div className="admin-toolbar admin-toolbar--end">
                      <AdminReorderButtons id={item.id} action={reorderNavigationItemAction} />
                      <AdminSubmitForm
                        action={toggleNavigationVisibilityAction}
                        successMessage={item.visible ? "Item hidden" : "Item visible"}
                      >
                        <input type="hidden" name="id" value={item.id} />
                        <input type="hidden" name="visible" value={item.visible ? "false" : "true"} />
                        <button type="submit" className="admin-btn admin-btn--ghost admin-btn--sm">
                          {item.visible ? "Hide" : "Show"}
                        </button>
                      </AdminSubmitForm>
                      <AdminSubmitForm
                        action={deleteNavigationItemAction}
                        loadingMessage="Deleting item…"
                        successMessage="Navigation item deleted"
                      >
                        <input type="hidden" name="id" value={item.id} />
                        <button type="submit" className="admin-btn admin-btn--danger admin-btn--sm">
                          Delete
                        </button>
                      </AdminSubmitForm>
                    </div>
                  </td>
                </tr>
              ))}
              {children.map((item) => (
                <tr key={item.id}>
                  <td className="admin-table-nested">{item.label}</td>
                  <td>{item.link_type}</td>
                  <td>{item.url ?? item.page_slug ?? "—"}</td>
                  <td>{item.sort_order}</td>
                  <td>
                    <AdminBadge value={item.visible} />
                  </td>
                  <td className="admin-table-actions">
                    <div className="admin-toolbar admin-toolbar--end">
                      <AdminReorderButtons id={item.id} action={reorderNavigationItemAction} />
                      <AdminSubmitForm
                        action={deleteNavigationItemAction}
                        loadingMessage="Deleting item…"
                        successMessage="Navigation item deleted"
                      >
                        <input type="hidden" name="id" value={item.id} />
                        <button type="submit" className="admin-btn admin-btn--danger admin-btn--sm">
                          Delete
                        </button>
                      </AdminSubmitForm>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
