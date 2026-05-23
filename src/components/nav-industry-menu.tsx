"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavColumn } from "@/lib/nav-menu";

type NavIndustryMenuProps = {
  label: string;
  columns: readonly NavColumn[];
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function NavIndustryMenu({
  label,
  columns,
  variant = "desktop",
  onNavigate,
}: NavIndustryMenuProps) {
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
          <div className="nav-mobile-sublist nav-mobile-sublist--mega">
            {columns.map((column, columnIndex) => (
              <div key={`${label}-col-${columnIndex}`} className="nav-mobile-mega-col">
                {column.heading ? (
                  <p className="nav-mobile-mega-heading">{column.heading}</p>
                ) : null}
                {column.links.map((item) => (
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
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="nav-dropdown nav-dropdown--mega">
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
        <div className="nav-mega-panel" role="menu">
          <div className="nav-mega-grid">
            {columns.map((column, columnIndex) => (
              <div key={`${label}-col-${columnIndex}`} className="nav-mega-col">
                {column.heading ? <p className="nav-mega-heading">{column.heading}</p> : null}
                <ul className="nav-mega-list">
                  {column.links.map((item) => (
                    <li key={`${label}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="nav-mega-link"
                        role="menuitem"
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
