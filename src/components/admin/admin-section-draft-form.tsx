"use client";

import { AdminFieldForm } from "@/components/admin/admin-field-form";
import { AdminSavePublishForm } from "@/components/admin/admin-save-publish-form";
import type { AdminField } from "@/lib/admin/field-schemas";
import {
  publishSectionAction,
  saveSectionDraftAction,
} from "@/app/admin/actions/sections";

type Props = {
  sectionId: string;
  sectionStatus: string;
  visible: boolean;
  fields: AdminField[];
  values: Record<string, unknown>;
};

export function AdminSectionDraftForm({
  sectionId,
  sectionStatus,
  visible,
  fields,
  values,
}: Props) {
  return (
    <AdminSavePublishForm
      saveAction={saveSectionDraftAction}
      publishAction={publishSectionAction}
      className="admin-form-grid admin-panel"
      saveLoadingMessage="Saving section draft…"
      publishLoadingMessage="Publishing section…"
      saveSuccessMessage="Section draft saved"
      publishSuccessMessage="Section published to live site"
    >
      <input type="hidden" name="id" value={sectionId} />
      <div className="admin-panel-head admin-field--full">
        <h2>
          Section content
          {sectionStatus === "draft" ? (
            <span className="admin-badge admin-badge--draft" style={{ marginLeft: "0.5rem" }}>
              Draft
            </span>
          ) : (
            <span className="admin-badge admin-badge--published" style={{ marginLeft: "0.5rem" }}>
              Published
            </span>
          )}
        </h2>
      </div>
      <label className="admin-check admin-field--full">
        <input type="checkbox" name="visible" defaultChecked={visible} /> Visible on site
      </label>
      <AdminFieldForm fields={fields} values={values} prefix="field_" />
    </AdminSavePublishForm>
  );
}
