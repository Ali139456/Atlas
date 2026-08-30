import Link from "next/link";
import { adminUrl } from "@/lib/admin/config";
import { getSectionFields } from "@/lib/admin/field-schemas";
import { AdminReorderButtons } from "@/components/admin/admin-reorder-buttons";
import { AdminSubmitForm } from "@/components/admin/admin-submit-form";
import { AdminSectionDraftForm } from "@/components/admin/admin-section-draft-form";
import { AdminSectionItemEditor } from "@/components/admin/admin-section-item-editor";
import { reorderSectionAction, reorderSectionItemAction } from "@/app/admin/actions/sections";
import { previewHomeAction } from "@/app/admin/actions/preview";
import { createServiceRoleClient } from "@/lib/supabase/admin";

type Props = { params: Promise<{ id: string }> };

export default async function AdminSectionEditPage({ params }: Props) {
  const { id } = await params;
  const client = createServiceRoleClient();
  if (!client) return <p className="admin-error">Database not configured.</p>;

  const { data: section } = await client
    .from("page_sections")
    .select("*, pages(slug, title), section_items(*)")
    .eq("id", id)
    .maybeSingle();

  if (!section) return <p className="admin-error">Section not found.</p>;

  const page = Array.isArray(section.pages) ? section.pages[0] : section.pages;
  const content = {
    ...((section.content as Record<string, unknown>) ?? {}),
    ...((section.draft_content as Record<string, unknown>) ?? {}),
  };
  const fields = getSectionFields(section.section_key);
  const items = [...(section.section_items ?? [])].sort(
    (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order,
  );

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <Link href={adminUrl("/sections")} className="admin-btn admin-btn--ghost admin-btn--sm">
            ← Sections
          </Link>
          <h1>Edit section: {section.section_key}</h1>
          <p>
            Page: {page?.title ?? page?.slug ?? "—"} · Status: {section.status} · Order:{" "}
            {section.sort_order}
          </p>
        </div>
        <div className="admin-toolbar">
          <AdminSubmitForm action={previewHomeAction} successMessage="Preview mode enabled">
            <button type="submit" className="admin-btn admin-btn--ghost">
              Preview home
            </button>
          </AdminSubmitForm>
          <AdminReorderButtons id={section.id} action={reorderSectionAction} />
        </div>
      </div>

      <AdminSectionDraftForm
        sectionId={section.id}
        sectionStatus={section.status}
        visible={section.visible}
        fields={fields}
        values={content}
      />

      {items.length > 0 ? (
        <section className="admin-panel">
          <h2>Section items ({items.length})</h2>
          <div className="admin-item-list">
            {items.map(
              (item: {
                id: string;
                content: Record<string, unknown>;
                visible: boolean;
                status: string;
              }) => (
                <AdminSectionItemEditor
                  key={item.id}
                  item={item}
                  reorderAction={reorderSectionItemAction}
                />
              ),
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}
