import Link from "next/link";
import { notFound } from "next/navigation";
import { adminUrl } from "@/lib/admin/config";
import { AdminRichText } from "@/components/admin/admin-rich-text";
import { AdminReorderButtons } from "@/components/admin/admin-reorder-buttons";
import { AdminSavePublishForm } from "@/components/admin/admin-save-publish-form";
import { AdminSubmitForm } from "@/components/admin/admin-submit-form";
import {
  deleteServiceCapabilityAction,
  deleteServiceOutcomeAction,
  deleteServiceAction,
  publishServiceAction,
  reorderServiceAction,
  saveServiceAction,
  saveServiceCapabilityAction,
  saveServiceOutcomeAction,
} from "@/app/admin/actions/services";
import { createServiceRoleClient } from "@/lib/supabase/admin";

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

type Props = { params: Promise<{ id: string }> };

export default async function AdminServiceEditPage({ params }: Props) {
  const { id } = await params;
  const client = createServiceRoleClient();
  if (!client) return <p className="admin-error">Database not configured.</p>;

  const [{ data: service }, { data: capabilities }, { data: outcomes }] = await Promise.all([
    client.from("services").select("*").eq("id", id).maybeSingle(),
    client
      .from("service_capabilities")
      .select("*")
      .eq("service_id", id)
      .order("sort_order", { ascending: true }),
    client.from("service_outcomes").select("*").eq("service_id", id).order("sort_order", { ascending: true }),
  ]);

  if (!service) notFound();

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <Link href={adminUrl("/services")} className="admin-btn admin-btn--ghost admin-btn--sm">
            ← Services
          </Link>
          <h1>{service.title}</h1>
          <p>
            Status: {service.status} · Slug: {service.slug}
          </p>
        </div>
        <div className="admin-toolbar">
          <AdminReorderButtons id={service.id} action={reorderServiceAction} />
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
        <input type="hidden" name="id" value={service.id} />
        <label className="admin-field">
          Title
          <input type="text" name="title" defaultValue={service.title} required />
        </label>
        <label className="admin-field">
          Short title
          <input type="text" name="short_title" defaultValue={service.short_title} required />
        </label>
        <label className="admin-field">
          Slug
          <input type="text" name="slug" defaultValue={service.slug} required />
        </label>
        <label className="admin-field">
          Index label
          <input type="text" name="index_label" defaultValue={service.index_label} />
        </label>
        <label className="admin-field">
          Icon
          <select name="icon" defaultValue={service.icon}>
            {ICONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </label>
        <label className="admin-field">
          Card description
          <textarea name="description" rows={3} defaultValue={service.description} />
        </label>
        <AdminRichText name="summary" label="Summary" defaultValue={service.summary} />
        <AdminRichText name="overview" label="Overview" defaultValue={service.overview} />
        <label className="admin-field">
          SEO title
          <input type="text" name="seo_title" defaultValue={service.seo_title ?? ""} />
        </label>
        <label className="admin-field">
          SEO description
          <textarea name="seo_description" rows={2} defaultValue={service.seo_description ?? ""} />
        </label>
        <label className="admin-field">
          CTA label
          <input type="text" name="cta_label" defaultValue={service.cta_label ?? ""} />
        </label>
        <label className="admin-field">
          CTA URL
          <input type="text" name="cta_url" defaultValue={service.cta_url ?? ""} />
        </label>
        <label className="admin-check">
          <input type="checkbox" name="featured" defaultChecked={service.featured} /> Featured
        </label>
        <label className="admin-check">
          <input type="checkbox" name="visible" defaultChecked={service.visible} /> Visible
        </label>
      </AdminSavePublishForm>

      <AdminSubmitForm
        action={deleteServiceAction}
        className="admin-toolbar"
        loadingMessage="Deleting service…"
        successMessage="Service deleted"
      >
        <input type="hidden" name="id" value={service.id} />
        <button type="submit" className="admin-btn admin-btn--danger">
          Delete service
        </button>
      </AdminSubmitForm>

      <section className="admin-panel">
        <h2>Capabilities</h2>
        {(capabilities ?? []).map((cap) => (
          <AdminSubmitForm
            key={cap.id}
            action={saveServiceCapabilityAction}
            deleteAction={deleteServiceCapabilityAction}
            className="admin-form-grid admin-item-card"
            successMessage="Capability saved"
            deleteSuccessMessage="Capability deleted"
          >
            <input type="hidden" name="id" value={cap.id} />
            <input type="hidden" name="service_id" value={service.id} />
            <label className="admin-field">
              Title
              <input type="text" name="title" defaultValue={cap.title} />
            </label>
            <AdminRichText name="description" label="Description" defaultValue={cap.description} />
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
          action={saveServiceCapabilityAction}
          className="admin-form-grid admin-item-card"
          successMessage="Capability added"
        >
          <input type="hidden" name="service_id" value={service.id} />
          <label className="admin-field">
            New capability title
            <input type="text" name="title" required />
          </label>
          <AdminRichText name="description" label="Description" defaultValue="" />
          <button type="submit" className="admin-btn admin-btn--ghost">
            Add capability
          </button>
        </AdminSubmitForm>
      </section>

      <section className="admin-panel">
        <h2>Outcomes</h2>
        {(outcomes ?? []).map((outcome) => (
          <AdminSubmitForm
            key={outcome.id}
            action={saveServiceOutcomeAction}
            deleteAction={deleteServiceOutcomeAction}
            className="admin-inline-form admin-item-card"
            successMessage="Outcome saved"
            deleteSuccessMessage="Outcome deleted"
          >
            <input type="hidden" name="id" value={outcome.id} />
            <input type="hidden" name="service_id" value={service.id} />
            <input type="text" name="text" defaultValue={outcome.text} className="admin-field-input" />
            <button type="submit" className="admin-btn admin-btn--ghost">
              Save
            </button>
            <button type="submit" data-admin-intent="delete" className="admin-btn admin-btn--danger">
              Delete
            </button>
          </AdminSubmitForm>
        ))}
        <AdminSubmitForm
          action={saveServiceOutcomeAction}
          className="admin-inline-form admin-item-card"
          successMessage="Outcome added"
        >
          <input type="hidden" name="service_id" value={service.id} />
          <input type="text" name="text" placeholder="New outcome" required className="admin-field-input" />
          <button type="submit" className="admin-btn admin-btn--ghost">
            Add outcome
          </button>
        </AdminSubmitForm>
      </section>
    </div>
  );
}
