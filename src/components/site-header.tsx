"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NavDropdown } from "@/components/nav-dropdown";
import { SiteLogo } from "@/components/site-logo";
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
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <Link href={href} className="nav-overlay-link" onClick={onNavigate}>
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

  const [homeLink, benefitsLink, whyLink, rolesLink, reviewsLink, contactLink] =
    navPrimaryLinks;

  return (
    <>
      <header className={`nav-wrap${scrolled ? " nav-wrap--scrolled" : ""}`}>
        <div className="site-container">
          <div className="nav-inner">
            <Link href="/" aria-label={`${site.brand} home`} className="nav-brand-chip">
              <SiteLogo priority className="nav-logo" />
            </Link>

            <nav className="nav-menu" aria-label="Main">
              <Link href={homeLink.href}>{homeLink.label}</Link>
              <Link href={benefitsLink.href}>{benefitsLink.label}</Link>
              <NavDropdown label="Services" items={navServicesLinks} />
              <NavDropdown label="Industry" items={navIndustryLinks} />
              <Link href={whyLink.href}>{whyLink.label}</Link>
              <Link href={rolesLink.href}>{rolesLink.label}</Link>
              <Link href={reviewsLink.href}>{reviewsLink.label}</Link>
              <Link href={contactLink.href}>{contactLink.label}</Link>
            </nav>

            <div className="nav-actions">
              <Link href={navCta.href} className="nav-cta-chip">
                <span>{navCta.label}</span>
                <span className="nav-cta-arrow" aria-hidden>
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 12L12 4M12 4H6.5M12 4V9.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
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
              <Link href="/" aria-label={`${site.brand} home`} className="nav-brand-chip" onClick={close}>
                <SiteLogo priority className="nav-logo" />
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
              <NavPlainLink href={benefitsLink.href} label={benefitsLink.label} onNavigate={close} />
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
              <NavPlainLink href={whyLink.href} label={whyLink.label} onNavigate={close} />
              <NavPlainLink href={rolesLink.href} label={rolesLink.label} onNavigate={close} />
              <NavPlainLink href={reviewsLink.href} label={reviewsLink.label} onNavigate={close} />
              <NavPlainLink href={contactLink.href} label={contactLink.label} onNavigate={close} />
            </nav>

            <div className="nav-overlay-actions">
              <Link href={navCta.href} className="nav-overlay-btn btn-neon" onClick={close}>
                {navCta.label}
              </Link>
            </div>

            <p className="nav-overlay-foot">Tap a link above or get a proposal</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
