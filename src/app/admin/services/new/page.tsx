import Link from "next/link";
import { adminUrl } from "@/lib/admin/config";
import { AdminRichText } from "@/components/admin/admin-rich-text";
import { AdminSavePublishForm } from "@/components/admin/admin-save-publish-form";
import { publishServiceAction, saveServiceAction } from "@/app/admin/actions/services";

const ICONS = [
  "bookkeeping",
  "payable",
  "reporting",
  "specialized",
  "payroll",
  "customer-service",
  "it-support",
  "cybersecurity",
  "bpo",
  "automation",
];

export default function AdminNewServicePage() {
  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <Link href={adminUrl("/services")} className="admin-btn admin-btn--ghost admin-btn--sm">
            ← Services
          </Link>
          <h1>Add service</h1>
        </div>
      </div>

      <AdminSavePublishForm
        saveAction={saveServiceAction}
        publishAction={publishServiceAction}
        className="admin-form-grid admin-panel"
        actionsClassName="admin-toolbar"
        saveSuccessMessage="Service draft saved"
        publishSuccessMessage="Service published"
      >
        <label className="admin-field">
          Title
          <input type="text" name="title" required />
        </label>
        <label className="admin-field">
          Short title
          <input type="text" name="short_title" required />
        </label>
        <label className="admin-field">
          Slug
          <input type="text" name="slug" placeholder="auto-from-title if blank" />
        </label>
        <label className="admin-field">
          Index label
          <input type="text" name="index_label" defaultValue="01" />
        </label>
        <label className="admin-field">
          Icon
          <select name="icon" defaultValue="bookkeeping">
            {ICONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </label>
        <label className="admin-field">
          Card description
          <textarea name="description" rows={3} />
        </label>
        <AdminRichText name="summary" label="Summary" />
        <AdminRichText name="overview" label="Overview" />
        <label className="admin-check">
          <input type="checkbox" name="featured" /> Featured
        </label>
        <label className="admin-check">
          <input type="checkbox" name="visible" defaultChecked /> Visible
        </label>
      </AdminSavePublishForm>
    </div>
  );
}
