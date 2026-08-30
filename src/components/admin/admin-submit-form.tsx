"use client";

import { useRef, type FormEvent, type ReactNode } from "react";
import { useAdminToast } from "@/components/admin/admin-toast";

type ActionHandler = (formData: FormData) => void | Promise<void>;

type Props = {
  action: ActionHandler;
  className?: string;
  children: ReactNode;
  loadingMessage?: string;
  successMessage?: string;
  deleteAction?: ActionHandler;
  deleteLoadingMessage?: string;
  deleteSuccessMessage?: string;
};

export function AdminSubmitForm({
  action,
  className,
  children,
  loadingMessage = "Saving…",
  successMessage = "Saved",
  deleteAction,
  deleteLoadingMessage = "Deleting…",
  deleteSuccessMessage = "Deleted",
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { promiseToast } = useAdminToast();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const isDelete = submitter?.dataset.adminIntent === "delete";
    const handler = isDelete && deleteAction ? deleteAction : action;
    const pendingMessage = isDelete && deleteAction ? deleteLoadingMessage : loadingMessage;
    const doneMessage = isDelete && deleteAction ? deleteSuccessMessage : successMessage;

    try {
      await promiseToast(
        pendingMessage,
        () => Promise.resolve(handler(new FormData(form))),
        doneMessage,
      );
    } catch {
      // Toast already shows the error.
    }
  }

  return (
    <form ref={formRef} className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
