import Link from "next/link";
import { notFound } from "next/navigation";
import { adminUrl } from "@/lib/admin/config";
import { AdminRichText } from "@/components/admin/admin-rich-text";
import { AdminReorderButtons } from "@/components/admin/admin-reorder-buttons";
import { AdminSavePublishForm } from "@/components/admin/admin-save-publish-form";
import { AdminSubmitForm } from "@/components/admin/admin-submit-form";
import {
  deleteIndustryAction,
  deleteIndustryChallengeAction,
  deleteIndustryHighlightAction,
  deleteIndustrySolutionAction,
  publishIndustryAction,
  reorderIndustryAction,
  saveIndustryAction,
  saveIndustryChallengeAction,
  saveIndustryHighlightAction,
  saveIndustrySolutionAction,
} from "@/app/admin/actions/industries";
import { createServiceRoleClient } from "@/lib/supabase/admin";

type Props = { params: Promise<{ id: string }> };

export default async function AdminIndustryEditPage({ params }: Props) {
  const { id } = await params;
  const client = createServiceRoleClient();
  if (!client) return <p className="admin-error">Database not configured.</p>;

  const [{ data: industry }, { data: highlights }, { data: challenges }, { data: solutions }] =
    await Promise.all([
      client.from("industries").select("*").eq("id", id).maybeSingle(),
      client.from("industry_highlights").select("*").eq("industry_id", id).order("sort_order"),
      client.from("industry_challenges").select("*").eq("industry_id", id).order("sort_order"),
      client.from("industry_solutions").select("*").eq("industry_id", id).order("sort_order"),
    ]);

  if (!industry) notFound();

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <Link href={adminUrl("/industries")} className="admin-btn admin-btn--ghost admin-btn--sm">
            ← Industries
          </Link>
          <h1>{industry.title}</h1>
        </div>
        <div className="admin-toolbar">
          <AdminReorderButtons id={industry.id} action={reorderIndustryAction} />
        </div>
      </div>

      <AdminSavePublishForm
        saveAction={saveIndustryAction}
        publishAction={publishIndustryAction}
        className="admin-form-grid admin-panel"
        actionsClassName="admin-toolbar"
        saveSuccessMessage="Industry draft saved"
        publishSuccessMessage="Industry published"
      >
        <input type="hidden" name="id" value={industry.id} />
        <label className="admin-field">
          Title
          <input type="text" name="title" defaultValue={industry.title} required />
        </label>
        <label className="admin-field">
          Short title
          <input type="text" name="short_title" defaultValue={industry.short_title} required />
        </label>
        <label className="admin-field">
          Slug
          <input type="text" name="slug" defaultValue={industry.slug} required />
        </label>
        <AdminRichText name="description" label="Description" defaultValue={industry.description} />
        <AdminRichText name="summary" label="Summary" defaultValue={industry.summary} />
        <label className="admin-field">
          Card image URL
          <input type="text" name="card_image" defaultValue={industry.card_image ?? ""} />
        </label>
        <label className="admin-field">
          Hero image URL
          <input type="text" name="hero_image" defaultValue={industry.hero_image ?? ""} />
        </label>
        <label className="admin-field">
          Dashboard image URL
          <input type="text" name="dashboard_image" defaultValue={industry.dashboard_image ?? ""} />
        </label>
        <label className="admin-check">
          <input type="checkbox" name="featured" defaultChecked={industry.featured} /> Featured
        </label>
        <label className="admin-check">
          <input type="checkbox" name="visible" defaultChecked={industry.visible} /> Visible
        </label>
      </AdminSavePublishForm>

      <AdminSubmitForm
        action={deleteIndustryAction}
        loadingMessage="Deleting industry…"
        successMessage="Industry deleted"
      >
        <input type="hidden" name="id" value={industry.id} />
        <button type="submit" className="admin-btn admin-btn--danger">
          Delete industry
        </button>
      </AdminSubmitForm>

      <section className="admin-panel">
        <h2>Highlights</h2>
        {(highlights ?? []).map((row) => (
          <AdminSubmitForm
            key={row.id}
            action={saveIndustryHighlightAction}
            deleteAction={deleteIndustryHighlightAction}
            className="admin-inline-form admin-item-card"
            successMessage="Highlight saved"
            deleteSuccessMessage="Highlight deleted"
          >
            <input type="hidden" name="id" value={row.id} />
            <input type="hidden" name="industry_id" value={industry.id} />
            <input type="text" name="text" defaultValue={row.text} className="admin-field-input" />
            <button type="submit" className="admin-btn admin-btn--ghost">
              Save
            </button>
            <button type="submit" data-admin-intent="delete" className="admin-btn admin-btn--danger">
              Delete
            </button>
          </AdminSubmitForm>
        ))}
        <AdminSubmitForm
          action={saveIndustryHighlightAction}
          className="admin-inline-form admin-item-card"
          successMessage="Highlight added"
        >
          <input type="hidden" name="industry_id" value={industry.id} />
          <input type="text" name="text" placeholder="New highlight" required className="admin-field-input" />
          <button type="submit" className="admin-btn admin-btn--ghost">
            Add
          </button>
        </AdminSubmitForm>
      </section>

      <section className="admin-panel">
        <h2>Challenges</h2>
        {(challenges ?? []).map((row) => (
          <AdminSubmitForm
            key={row.id}
            action={saveIndustryChallengeAction}
            deleteAction={deleteIndustryChallengeAction}
            className="admin-form-grid admin-item-card"
            successMessage="Challenge saved"
            deleteSuccessMessage="Challenge deleted"
          >
            <input type="hidden" name="id" value={row.id} />
            <input type="hidden" name="industry_id" value={industry.id} />
            <label className="admin-field">
              Title
              <input type="text" name="title" defaultValue={row.title} />
            </label>
            <AdminRichText name="description" label="Description" defaultValue={row.description} />
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
          action={saveIndustryChallengeAction}
          className="admin-form-grid admin-item-card"
          successMessage="Challenge added"
        >
          <input type="hidden" name="industry_id" value={industry.id} />
          <label className="admin-field">
            New challenge title
            <input type="text" name="title" required />
          </label>
          <AdminRichText name="description" label="Description" />
          <button type="submit" className="admin-btn admin-btn--ghost">
            Add challenge
          </button>
        </AdminSubmitForm>
      </section>

      <section className="admin-panel">
        <h2>Solutions</h2>
        {(solutions ?? []).map((row) => (
          <AdminSubmitForm
            key={row.id}
            action={saveIndustrySolutionAction}
            deleteAction={deleteIndustrySolutionAction}
            className="admin-form-grid admin-item-card"
            successMessage="Solution saved"
            deleteSuccessMessage="Solution deleted"
          >
            <input type="hidden" name="id" value={row.id} />
            <input type="hidden" name="industry_id" value={industry.id} />
            <label className="admin-field">
              Title
              <input type="text" name="title" defaultValue={row.title} />
            </label>
            <AdminRichText name="description" label="Description" defaultValue={row.description} />
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
          action={saveIndustrySolutionAction}
          className="admin-form-grid admin-item-card"
          successMessage="Solution added"
        >
          <input type="hidden" name="industry_id" value={industry.id} />
          <label className="admin-field">
            New solution title
            <input type="text" name="title" required />
          </label>
          <AdminRichText name="description" label="Description" />
          <button type="submit" className="admin-btn admin-btn--ghost">
            Add solution
          </button>
        </AdminSubmitForm>
      </section>
    </div>
  );
}
