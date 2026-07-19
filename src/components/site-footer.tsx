import Link from "next/link";
import { footerBarLinks, footerLinkGroups } from "@/lib/nav-menu";
import { SiteLogo } from "@/components/site-logo";
import { homeAnchors, site } from "@/lib/site-content";

function FooterLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  return <Link href={href}>{label}</Link>;
}

export function SiteFooter() {
  return (
    <footer className="site-footer section-bg">
      <div className="site-container footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" aria-label={`${site.brand} home`} className="footer-logo-link">
              <SiteLogo className="footer-logo" />
            </Link>
            <Link href={homeAnchors.contact} className="footer-cta">
              Get a no-obligation proposal →
            </Link>
          </div>

          <div className="footer-links-grid">
            {footerLinkGroups.map((group) => (
              <div key={group.title} className="footer-col">
                <p className="footer-col-title">{group.title}</p>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href} label={link.label} external={link.external} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="footer-col footer-col--contact">
              <p className="footer-col-title">Contact Us</p>
              <ul className="footer-contact-list">
                <li className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                  <span className="footer-contact-value footer-contact-address">
                    {site.addressLine1}
                    <br />
                    {site.addressLine2}
                  </span>
                </li>
                <li className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h2.5a1 1 0 01.95.69l1.1 3.3a1 1 0 01-.5 1.21l-1.66.83a11.04 11.04 0 005.52 5.52l.83-1.66a1 1 0 011.21-.5l3.3 1.1a1 1 0 01.69.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z"
                      />
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
            {footerBarLinks.map((l) => (
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
