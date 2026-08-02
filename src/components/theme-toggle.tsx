"use client";

import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      onClick={() => setTheme(isLight ? "dark" : "light")}
    >
      <span className="theme-toggle-track" aria-hidden>
        <span className={`theme-toggle-thumb${isLight ? " theme-toggle-thumb--light" : ""}`}>
          {mounted ? (
            isLight ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )
          ) : null}
        </span>
      </span>
    </button>
  );
}
