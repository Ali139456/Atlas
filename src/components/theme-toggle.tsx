"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTheme } from "@/components/theme-provider";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
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
              <Sun className="h-4 w-4" strokeWidth={2} aria-hidden />
            ) : (
              <Moon className="h-4 w-4" strokeWidth={2} aria-hidden />
            )
          ) : null}
        </span>
      </span>
    </button>
  );
}
