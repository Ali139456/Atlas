"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavDropdown } from "@/components/nav-dropdown";
import {
  navCta,
  navIndustryLinks,
  navPrimaryLinks,
  navServicesLinks,
} from "@/lib/nav-menu";
import { site } from "@/lib/site-content";

function NavPlainLink({
  href,
  label,
  onNavigate,
  highlight,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={highlight ? "nav-overlay-link nav-overlay-link--highlight" : "nav-overlay-link"}
      onClick={onNavigate}
    >
      <span>{label}</span>
      <span className="nav-overlay-link-icon" aria-hidden>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const homeLink = navPrimaryLinks[0];
  const aboutLink = navPrimaryLinks[1];
  const contactLink = navPrimaryLinks[2];

  return (
    <>
      <header className={`nav-wrap${scrolled ? " nav-wrap--scrolled" : ""}`}>
        <div className="nav-wrap-glow" aria-hidden />
        <div className="site-container">
          <div className="nav-inner">
            <Link href="/" aria-label={`${site.brand} home`} className="nav-brand shrink-0">
              <Image
                src={site.logo}
                alt=""
                width={400}
                height={500}
                className="nav-logo"
                priority
                loading="eager"
              />
            </Link>

            <nav className="nav-menu" aria-label="Main">
              <Link href={homeLink.href}>{homeLink.label}</Link>
              <Link href={aboutLink.href}>{aboutLink.label}</Link>
              <NavDropdown label="Services" items={navServicesLinks} />
              <NavDropdown label="Industry" items={navIndustryLinks} />
              <Link href={contactLink.href}>{contactLink.label}</Link>
            </nav>

            <div className="nav-actions">
              <Link href={navCta.href} className="btn-neon !py-2.5 !px-5 !text-[0.65rem]">
                {navCta.label}
              </Link>
            </div>

            <button
              type="button"
              className="nav-toggle nav-mobile-only"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
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
          className="nav-overlay nav-mobile-only"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="nav-overlay-glow" aria-hidden />
          <div className="nav-overlay-inner site-container">
            <div className="nav-overlay-top">
              <Link href="/" aria-label={`${site.brand} home`} className="nav-brand" onClick={close}>
                <Image
                  src={site.logo}
                  alt=""
                  width={400}
                  height={500}
                  className="nav-logo"
                  loading="eager"
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
              <NavPlainLink href={homeLink.href} label={homeLink.label} onNavigate={close} />
              <NavPlainLink href={aboutLink.href} label={aboutLink.label} onNavigate={close} />
              <NavDropdown
                label="Services"
                items={navServicesLinks}
                variant="mobile"
                onNavigate={close}
              />
              <NavDropdown
                label="Industry"
                items={navIndustryLinks}
                variant="mobile"
                onNavigate={close}
              />
              <NavPlainLink
                href={contactLink.href}
                label={contactLink.label}
                onNavigate={close}
                highlight
              />
            </nav>

            <div className="nav-overlay-actions">
              <Link href={navCta.href} className="nav-overlay-btn btn-neon" onClick={close}>
                {navCta.label}
              </Link>
            </div>

            <p className="nav-overlay-foot">Tap a link above or request a no-obligation proposal</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
