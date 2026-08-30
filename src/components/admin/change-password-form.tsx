"use client";

import { useActionState, useEffect } from "react";
import {
  changePasswordAction,
  type ChangePasswordState,
} from "@/app/admin/actions/auth";
import { useAdminToast } from "@/components/admin/admin-toast";

const initialState: ChangePasswordState = { ok: false };

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changePasswordAction, initialState);
  const { showToast } = useAdminToast();

  useEffect(() => {
    if (state.ok) {
      const form = document.getElementById("change-password-form") as HTMLFormElement | null;
      form?.reset();
      showToast(state.message ?? "Password updated", "success");
    } else if (state.error) {
      showToast(state.error, "error");
    }
  }, [state.error, state.message, state.ok, showToast]);

  return (
    <form id="change-password-form" action={formAction} className="admin-form-grid">
      <label className="admin-field">
        Current password
        <input type="password" name="currentPassword" required autoComplete="current-password" />
      </label>
      <label className="admin-field">
        New password
        <input type="password" name="newPassword" required minLength={12} autoComplete="new-password" />
      </label>
      <label className="admin-field">
        Confirm new password
        <input type="password" name="confirmPassword" required minLength={12} autoComplete="new-password" />
      </label>
      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn--primary" disabled={pending}>
          {pending ? "Updating…" : "Change password"}
        </button>
      </div>
    </form>
  );
}
