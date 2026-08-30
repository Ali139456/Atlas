"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { adminUrl } from "@/lib/admin/config";
import { loginAction, type AuthActionState } from "@/app/admin/actions/auth";

const initialState: AuthActionState = { ok: false };

export function AdminLoginForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.ok) router.replace(adminUrl("/dashboard"));
  }, [state.ok, router]);

  return (
    <form action={formAction} className="admin-login-form">
      <h1 className="admin-login-title">Sign in</h1>
      <p className="admin-login-sub">Private Atlas Global Finance administration</p>

      <label className="admin-field">
        <span>Username</span>
        <input name="username" autoComplete="username" required disabled={pending} />
      </label>

      <label className="admin-field">
        <span>Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending}
        />
      </label>

      {state.error ? <p className="admin-error">{state.error}</p> : null}

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn--primary" disabled={pending}>
          {pending ? "Signing in…" : "Sign In"}
        </button>
      </div>
    </form>
  );
}
