"use client";

import { useState } from "react";
import { useAdminToast } from "@/components/admin/admin-toast";

export function MediaUploadForm() {
  const { promiseToast } = useAdminToast();
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setPending(true);
    try {
      await promiseToast(
        "Uploading media…",
        async () => {
          const res = await fetch("/api/admin/media", { method: "POST", body: formData });
          const data = (await res.json()) as { error?: string; url?: string };
          if (!res.ok) {
            throw new Error(data.error ?? "Upload failed");
          }
          form.reset();
          window.location.reload();
          return data;
        },
        "Media uploaded",
      );
    } catch {
      // Toast already shows the error.
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="admin-form-grid admin-panel" encType="multipart/form-data">
      <h2>Upload media</h2>
      <label className="admin-field">
        Image file
        <input type="file" name="file" accept="image/*,.svg" required />
      </label>
      <label className="admin-field">
        Alt text
        <input type="text" name="alt_text" />
      </label>
      <label className="admin-field">
        Title
        <input type="text" name="title" />
      </label>
      <button type="submit" className="admin-btn admin-btn--primary" disabled={pending}>
        {pending ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}
