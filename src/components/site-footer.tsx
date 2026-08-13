import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { SocialIcon } from "@/components/social-icon";
import {
  footerBarLinks,
  footerLinkGroups,
  footerSocialLinks,
  navCta,
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
  const className = "footer-link";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        <span>{label}</span>
        <ArrowUpRight className="footer-link-icon" strokeWidth={2} aria-hidden />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      <span>{label}</span>
      <ArrowUpRight className="footer-link-icon" strokeWidth={2} aria-hidden />
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-glow footer-glow--left" aria-hidden />
      <div className="footer-glow footer-glow--right" aria-hidden />

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
            <Link href={navCta.href} className="footer-cta">
              {navCta.label}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
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

          <div className="footer-links-wrap">
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
          </div>

          <div className="footer-col footer-col--touch">
            <p className="footer-col-title">Get in Touch</p>
            <ul className="footer-touch-list">
              <li className="footer-touch-item">
                <span className="footer-touch-icon" aria-hidden>
                  <MapPin className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.6} />
                </span>
                <span className="footer-touch-copy">{site.addressLine1}</span>
              </li>
              <li className="footer-touch-item">
                <span className="footer-touch-icon" aria-hidden>
                  <Phone className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.6} />
                </span>
                <span className="footer-touch-copy">
                  <a href={`tel:${site.phone.replace(/\D/g, "")}`}>{site.phone}</a>
                  <br />
                  <a href={`tel:${site.phoneAlt.replace(/\D/g, "")}`}>{site.phoneAlt}</a>
                </span>
              </li>
              <li className="footer-touch-item">
                <span className="footer-touch-icon" aria-hidden>
                  <Mail className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.6} />
                </span>
                <a className="footer-touch-copy" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bar">
          <p className="footer-copy">
            © {new Date().getFullYear()} {site.brand}. All rights reserved.
          </p>
          <nav className="footer-bar-nav" aria-label="Legal">
            {footerBarLinks.map((link) => (
              <FooterLink key={link.label} href={link.href} label={link.label} external={link.external} />
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
