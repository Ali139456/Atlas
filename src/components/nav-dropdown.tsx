"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavLink } from "@/lib/nav-menu";

type NavDropdownProps = {
  label: string;
  items: readonly NavLink[];
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function NavDropdown({ label, items, variant = "desktop", onNavigate }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant !== "desktop" || !open) return;
    const onPointer = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open, variant]);

  const close = () => {
    setOpen(false);
    onNavigate?.();
  };

  if (variant === "mobile") {
    return (
      <div className="nav-mobile-group">
        <button
          type="button"
          className="nav-overlay-link nav-mobile-group-trigger"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{label}</span>
          <span className="nav-overlay-link-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={open ? "M6 15l6-6 6 6" : "M9 18l6-6-6-6"} />
            </svg>
          </span>
        </button>
        {open ? (
          <div className="nav-mobile-sublist">
            {items.map((item) => (
              <Link
                key={`${label}-${item.label}`}
                href={item.href}
                className="nav-mobile-sublink"
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={close}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="nav-dropdown">
      <button
        type="button"
        className="nav-dropdown-trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <svg className="nav-dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open ? (
        <div className="nav-dropdown-panel" role="menu">
          {items.map((item) => (
            <Link
              key={`${label}-${item.label}`}
              href={item.href}
              className="nav-dropdown-item"
              role="menuitem"
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
