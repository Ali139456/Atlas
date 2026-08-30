"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavDropdown } from "@/components/nav-dropdown";
import { SiteLogo } from "@/components/site-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  navCta as defaultNavCta,
  navIndustryLinks as defaultIndustryLinks,
  navPrimaryLinks as defaultPrimaryLinks,
  navServicesLinks as defaultServicesLinks,
  type NavLink,
} from "@/lib/nav-menu";
import { site as defaultSite } from "@/lib/site-content";

type SiteHeaderProps = {
  primaryLinks?: readonly NavLink[];
  servicesLinks?: readonly NavLink[];
  industryLinks?: readonly NavLink[];
  siteCta?: { label: string; href: string };
  brand?: string;
  tagline?: string;
};

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
        <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
      </span>
    </Link>
  );
}

export function SiteHeader({
  primaryLinks = defaultPrimaryLinks,
  servicesLinks = defaultServicesLinks,
  industryLinks = defaultIndustryLinks,
  siteCta = defaultNavCta,
  brand = defaultSite.brand,
  tagline = defaultSite.tagline,
}: SiteHeaderProps = {}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
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

  const [homeLink, valueLink, whyLink, techLink, howLink, contactLink] =
    primaryLinks;

  return (
    <>
      <header
        className={`nav-wrap${isHome ? " nav-wrap--home" : ""}${scrolled ? " nav-wrap--scrolled" : ""}`}
      >
        <div className="site-container">
          <div className="nav-inner">
            <Link href="/" aria-label={`${brand} home`} className="nav-brand-chip">
              <SiteLogo priority className="nav-logo" />
            </Link>

            <nav className="nav-menu" aria-label="Main">
              <Link href={homeLink.href}>{homeLink.label}</Link>
              <Link href={valueLink.href}>{valueLink.label}</Link>
              <NavDropdown label="Services" items={servicesLinks} mega />
              <NavDropdown label="Industry" items={industryLinks} />
              <Link href={whyLink.href}>{whyLink.label}</Link>
              <Link href={techLink.href}>{techLink.label}</Link>
              <Link href={howLink.href}>{howLink.label}</Link>
              <Link href={contactLink.href}>{contactLink.label}</Link>
            </nav>

            <div className="nav-actions">
              <ThemeToggle />
              <Link href={siteCta.href} className="nav-cta-chip">
                <span>{siteCta.label}</span>
                <span className="nav-cta-arrow" aria-hidden>
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                </span>
              </Link>
            </div>

            <div className="nav-mobile-actions nav-mobile-only">
              <ThemeToggle />
              <button
                type="button"
                className="nav-toggle"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
              >
                {open ? (
                  <X className="h-5 w-5" strokeWidth={2} aria-hidden />
                ) : (
                  <Menu className="h-5 w-5" strokeWidth={2} aria-hidden />
                )}
              </button>
            </div>
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
              <Link href="/" aria-label={`${brand} home`} className="nav-brand-chip" onClick={close}>
                <SiteLogo priority className="nav-logo" />
              </Link>
              <button
                type="button"
                className="nav-overlay-close"
                aria-label="Close menu"
                onClick={close}
              >
                <X className="h-5 w-5" strokeWidth={2} aria-hidden />
              </button>
            </div>

            <div className="nav-overlay-intro">
              <p className="nav-overlay-eyebrow">Explore</p>
              <p className="nav-overlay-sub">{tagline}</p>
            </div>

            <nav className="nav-overlay-nav" aria-label="Mobile">
              <NavPlainLink href={homeLink.href} label={homeLink.label} onNavigate={close} />
              <NavPlainLink href={valueLink.href} label={valueLink.label} onNavigate={close} />
              <NavDropdown
                label="Services"
                items={servicesLinks}
                variant="mobile"
                mega
                onNavigate={close}
              />
              <NavDropdown
                label="Industry"
                items={industryLinks}
                variant="mobile"
                onNavigate={close}
              />
              <NavPlainLink href={whyLink.href} label={whyLink.label} onNavigate={close} />
              <NavPlainLink href={techLink.href} label={techLink.label} onNavigate={close} />
              <NavPlainLink href={howLink.href} label={howLink.label} onNavigate={close} />
              <NavPlainLink href={contactLink.href} label={contactLink.label} onNavigate={close} />
            </nav>

            <div className="nav-overlay-actions">
              <ThemeToggle />
              <Link href={siteCta.href} className="nav-overlay-btn btn-neon" onClick={close}>
                {siteCta.label}
              </Link>
            </div>

            <p className="nav-overlay-foot">Tap a link above or inquire now</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
