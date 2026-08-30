"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminUrl } from "@/lib/admin/config";
import { loginAction, type AuthActionState } from "@/app/admin/actions/auth";

const initialState: AuthActionState = { ok: false };

export function AdminLoginForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

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
        <span className="admin-password-field">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            disabled={pending}
          />
          <button
            type="button"
            className="admin-password-toggle"
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={pending}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </span>
      </label>

      {state.error ? <p className="admin-error">{state.error}</p> : null}

      <div className="admin-login-actions">
        <button type="submit" className="admin-btn admin-btn--primary admin-login-submit" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </form>
  );
}
