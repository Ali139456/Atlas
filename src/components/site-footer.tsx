import Link from "next/link";
import {
  footerLinkGroups,
  footerSocialLinks,
} from "@/lib/nav-menu";
import { SiteLogo } from "@/components/site-logo";
import { site } from "@/lib/site-content";
import "./site-footer.css";

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

function SocialIcon({ icon }: { icon: (typeof footerSocialLinks)[number]["icon"] }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "linkedin":
      return (
        <svg {...props}>
          <path d="M7 10v10M7 7v.01" strokeLinecap="round" />
          <path d="M11 20v-6a3 3 0 016 0v6M11 11v9" />
          <rect x="3" y="3" width="18" height="18" rx="3" />
        </svg>
      );
    case "x":
      return (
        <svg {...props}>
          <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...props}>
          <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.4l.6-3H13v-2c0-.6.4-1 1-1z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label={`${site.brand} home`} className="footer-logo-link">
              <SiteLogo className="footer-logo" />
            </Link>
            <p className="footer-blurb">
              Explore outsourced accounting from {site.brand} to streamline closes, cut cost,
              and grow without overhead.
            </p>
            <div className="footer-socials">
              {footerSocialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social"
                  aria-label={item.label}
                >
                  <SocialIcon icon={item.icon} />
                </a>
              ))}
            </div>
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.title} className="footer-col">
              <p className="footer-col-title">{group.title}</p>
              <ul>
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <FooterLink href={link.href} label={link.label} external={link.external} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer-col footer-col--touch">
            <p className="footer-col-title">Get in Touch</p>
            <ul className="footer-touch-list">
              <li>
                <span className="footer-touch-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 21s7-5.4 7-11a7 7 0 10-14 0c0 5.6 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.4" />
                  </svg>
                </span>
                <span>
                  {site.addressLine1}
                  <br />
                  {site.addressLine2}
                </span>
              </li>
              <li>
                <span className="footer-touch-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M6.5 4.5h3l1.5 4-2 1.5a12 12 0 005.5 5.5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A15.5 15.5 0 014.5 6.7 2 2 0 016.5 4.5z" />
                  </svg>
                </span>
                <span>
                  <a href={`tel:${site.phone.replace(/\D/g, "")}`}>{site.phone}</a>
                  <br />
                  <a href={`tel:${site.phoneAlt.replace(/\D/g, "")}`}>{site.phoneAlt}</a>
                </span>
              </li>
              <li>
                <span className="footer-touch-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <p className="footer-copy">
          © Copyright {new Date().getFullYear()}, All Rights Reserved by {site.brand}
        </p>
      </div>
    </footer>
  );
}
