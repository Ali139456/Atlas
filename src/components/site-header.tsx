"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site-content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="nav-wrap">
        <div className="site-container">
          <div className="nav-inner">
            <Link href="/" aria-label="Atlas Global Finance home" className="nav-brand shrink-0">
              <Image
                src="/atlas-logo.png"
                alt=""
                width={400}
                height={500}
                className="nav-logo"
                priority
              />
            </Link>

            <nav className="nav-menu" aria-label="Main">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="nav-actions">
              <Link href="#contact" className="btn-outline !py-2.5 !px-5 !text-[0.65rem]">
                Get started
              </Link>
              <Link href="#contact" className="btn-neon !py-2.5 !px-5 !text-[0.65rem]">
                Join today
              </Link>
            </div>

            <button
              type="button"
              className="nav-toggle lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          className="nav-overlay lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="nav-overlay-glow" aria-hidden />
          <div className="nav-overlay-inner site-container">
            <div className="nav-overlay-top">
              <Link href="/" aria-label="Atlas Global Finance home" className="nav-brand" onClick={close}>
                <Image
                  src="/atlas-logo.png"
                  alt=""
                  width={400}
                  height={500}
                  className="nav-logo"
                />
              </Link>
              <button
                type="button"
                className="nav-overlay-close"
                aria-label="Close menu"
                onClick={close}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="nav-overlay-intro">
              <p className="nav-overlay-eyebrow">Explore</p>
              <p className="nav-overlay-sub">{site.tagline}</p>
            </div>

            <nav className="nav-overlay-nav" aria-label="Mobile">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`nav-overlay-link ${
                    l.href === "#contact" ? "nav-overlay-link--highlight" : ""
                  }`}
                  onClick={close}
                >
                  <span>{l.label}</span>
                  <span className="nav-overlay-link-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </span>
                </Link>
              ))}
            </nav>

            <div className="nav-overlay-actions">
              <Link href="#contact" className="nav-overlay-btn btn-outline" onClick={close}>
                Get started
              </Link>
              <Link href="#contact" className="nav-overlay-btn btn-neon" onClick={close}>
                Join today
              </Link>
            </div>

            <p className="nav-overlay-foot">Tap a link above or book a free consult</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
