"use client";

import { useRef, useState } from "react";
import { useAdminToast } from "@/components/admin/admin-toast";

type ActionHandler = (formData: FormData) => void | Promise<void>;

type Props = {
  saveAction: ActionHandler;
  publishAction: ActionHandler;
  className?: string;
  actionsClassName?: string;
  children: React.ReactNode;
  saveLabel?: string;
  publishLabel?: string;
  saveLoadingMessage?: string;
  publishLoadingMessage?: string;
  saveSuccessMessage?: string;
  publishSuccessMessage?: string;
};

export function AdminSavePublishForm({
  saveAction,
  publishAction,
  className,
  actionsClassName = "admin-form-actions",
  children,
  saveLabel = "Save draft",
  publishLabel = "Publish",
  saveLoadingMessage = "Saving draft…",
  publishLoadingMessage = "Publishing…",
  saveSuccessMessage = "Draft saved",
  publishSuccessMessage = "Published to live site",
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { promiseToast } = useAdminToast();
  const [busy, setBusy] = useState<"save" | "publish" | null>(null);

  async function handleAction(intent: "save" | "publish") {
    const form = formRef.current;
    if (!form) return;

    setBusy(intent);
    const formData = new FormData(form);
    const action = intent === "publish" ? publishAction : saveAction;
    const loadingMessage = intent === "publish" ? publishLoadingMessage : saveLoadingMessage;
    const successMessage = intent === "publish" ? publishSuccessMessage : saveSuccessMessage;

    try {
      await promiseToast(loadingMessage, () => Promise.resolve(action(formData)), successMessage);
    } catch {
      // Toast already shows the error.
    } finally {
      setBusy(null);
    }
  }

  return (
    <form
      ref={formRef}
      className={className}
      onSubmit={(event) => event.preventDefault()}
    >
      {children}
      <div className={actionsClassName}>
        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          disabled={busy !== null}
          onClick={() => void handleAction("save")}
        >
          {busy === "save" ? "Saving…" : saveLabel}
        </button>
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          disabled={busy !== null}
          onClick={() => void handleAction("publish")}
        >
          {busy === "publish" ? "Publishing…" : publishLabel}
        </button>
      </div>
    </form>
  );
}
