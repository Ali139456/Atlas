import Image from "next/image";
import Link from "next/link";
import { homeAnchors, navLinks, site } from "@/lib/site-content";

const linkGroups = [
  {
    title: "Services",
    links: [
      { href: "/services/owners-developers", label: "Owners & Developers" },
      { href: "/services/property-management", label: "Property Management" },
      { href: "/services/asset-management", label: "Asset Management" },
      { href: "/services/investors", label: "Investors" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: homeAnchors.mission, label: "About" },
      { href: homeAnchors.process, label: "Process" },
      { href: homeAnchors.faq, label: "FAQ" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <div className="footer-main">
          <div
            className="footer-brand"
          >
            <Link href="/" aria-label={`${site.brand} home`} className="footer-logo-link">
              <Image
                src={site.logo}
                alt=""
                width={400}
                height={500}
                className="footer-logo"
              />
            </Link>
            <p className="footer-tagline">
              Accounting and finance outsourcing: AP, AR, bookkeeping, payroll, reconciliations,
              and reporting for growing businesses.
            </p>
            <Link href={homeAnchors.contact} className="footer-cta">
              Schedule a consultation →
            </Link>
          </div>

          <div className="footer-links-grid">
            {linkGroups.map((group) => (
              <div key={group.title} className="footer-col">
                <p className="footer-col-title">{group.title}</p>
                <ul>
                  {group.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="footer-col footer-col--contact">
              <p className="footer-col-title">Contact</p>
              <ul className="footer-contact-list">
                <li className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                  <span className="footer-contact-value">{site.address}</span>
                </li>
                <li className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 4h4l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v4c0 1-1 2-2 2-2.8A16 16 0 0 1 3.8 6C3 6 2 5 2 4V4z" />
                    </svg>
                  </span>
                  <a href={`tel:${site.phone.replace(/\D/g, "")}`} className="footer-contact-value">
                    {site.phone}
                  </a>
                </li>
                <li className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  </span>
                  <a href={`mailto:${site.email}`} className="footer-contact-value">
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bar">
          <p className="footer-copy">
            © {new Date().getFullYear()} {site.brand}. All rights reserved.
          </p>
          <nav className="footer-bar-nav" aria-label="Footer">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <a href="#top" className="footer-top-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
