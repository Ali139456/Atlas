"use client";

import { useRef, useState } from "react";
import { AdminFieldForm } from "@/components/admin/admin-field-form";
import { AdminReorderButtons } from "@/components/admin/admin-reorder-buttons";
import { useAdminToast } from "@/components/admin/admin-toast";
import { getItemLabel, getSectionItemFields } from "@/lib/admin/field-schemas";

type Props = {
  item: {
    id: string;
    visible: boolean;
    status?: string;
    content: Record<string, unknown>;
  };
  reorderAction: (formData: FormData) => void | Promise<void>;
};

async function submitItemForm(form: HTMLFormElement, intent: "save" | "publish") {
  const formData = new FormData(form);
  formData.set("_intent", intent);

  const response = await fetch("/api/admin/section-items", {
    method: "POST",
    body: formData,
  });

  const data = (await response.json()) as { error?: string; published?: boolean };
  if (!response.ok) {
    throw new Error(data.error ?? (intent === "publish" ? "Publish failed" : "Save failed"));
  }

  return data;
}

export function AdminSectionItemEditor({ item, reorderAction }: Props) {
  const itemContent = item.content ?? {};
  const itemType = String(itemContent.item_type ?? "item");
  const itemFields = getSectionItemFields(itemType, itemContent);
  const formRef = useRef<HTMLFormElement>(null);
  const { promiseToast } = useAdminToast();
  const [busy, setBusy] = useState<"save" | "publish" | null>(null);
  const [itemStatus, setItemStatus] = useState(item.status ?? "published");

  async function handleAction(intent: "save" | "publish") {
    const form = formRef.current;
    if (!form) return;

    setBusy(intent);

    try {
      await promiseToast(
        intent === "publish" ? "Publishing item…" : "Saving item…",
        () => submitItemForm(form, intent),
        intent === "publish" ? "Item published to live site" : "Item saved as draft",
      );
      setItemStatus(intent === "publish" ? "published" : "draft");
    } catch {
      // Toast already shows the error.
    } finally {
      setBusy(null);
    }
  }

  return (
    <details className="admin-item-card" open>
      <summary>
        <span className="admin-item-card-title">
          {getItemLabel(itemContent)}
          {itemStatus === "draft" ? (
            <span className="admin-badge admin-badge--draft">Draft</span>
          ) : (
            <span className="admin-badge admin-badge--published">Published</span>
          )}
        </span>
        <AdminReorderButtons id={item.id} action={reorderAction} />
      </summary>
      <form ref={formRef} className="admin-form-grid" onSubmit={(event) => event.preventDefault()}>
        <input type="hidden" name="id" value={item.id} />
        <input type="hidden" name="item_type" value={itemType} />
        <label className="admin-check admin-field--full">
          <input type="checkbox" name="visible" defaultChecked={item.visible} /> Visible
        </label>
        <AdminFieldForm fields={itemFields} values={itemContent} prefix="item_" />
        <div className="admin-form-actions">
          <button
            type="button"
            className="admin-btn admin-btn--ghost"
            disabled={busy !== null}
            onClick={() => void handleAction("save")}
          >
            {busy === "save" ? "Saving…" : "Save draft"}
          </button>
          <button
            type="button"
            className="admin-btn admin-btn--primary"
            disabled={busy !== null}
            onClick={() => void handleAction("publish")}
          >
            {busy === "publish" ? "Publishing…" : "Publish"}
          </button>
        </div>
      </form>
    </details>
  );
}
