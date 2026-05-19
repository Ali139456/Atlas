"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { serviceCategories } from "@/lib/service-categories";

type Props = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function NavServicesMenu({ variant = "desktop", onNavigate }: Props) {
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

  if (variant === "mobile") {
    return (
      <Link href="/#services" className="nav-overlay-link" onClick={onNavigate}>
        <span>Services</span>
        <span className="nav-overlay-link-icon" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </span>
      </Link>
    );
  }

  return (
    <div ref={wrapRef} className="nav-dropdown">
      <button
        type="button"
        className="nav-dropdown-trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        Services
        <svg className="nav-dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open ? (
        <div className="nav-dropdown-panel" role="menu">
          {serviceCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/services/${c.slug}`}
              className="nav-dropdown-item"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {c.shortTitle}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
