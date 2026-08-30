"use client";

import { useTransition } from "react";

export function AdminReorderButtons({
  id,
  action,
  extraFields,
}: {
  id: string;
  action: (formData: FormData) => void | Promise<void>;
  extraFields?: Record<string, string>;
}) {
  const [pending, startTransition] = useTransition();

  function reorder(direction: "up" | "down") {
    const formData = new FormData();
    formData.set("id", id);
    formData.set("direction", direction);
    if (extraFields) {
      for (const [key, value] of Object.entries(extraFields)) {
        formData.set(key, value);
      }
    }
    startTransition(() => {
      void action(formData);
    });
  }

  return (
    <div className="admin-reorder">
      <button
        type="button"
        className="admin-btn admin-btn--ghost admin-btn--sm"
        aria-label="Move up"
        disabled={pending}
        onClick={() => reorder("up")}
      >
        ↑
      </button>
      <button
        type="button"
        className="admin-btn admin-btn--ghost admin-btn--sm"
        aria-label="Move down"
        disabled={pending}
        onClick={() => reorder("down")}
      >
        ↓
      </button>
    </div>
  );
}
