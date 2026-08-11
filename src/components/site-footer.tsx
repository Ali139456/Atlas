import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { SocialIcon } from "@/components/social-icon";
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
                  <MapPin className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} />
                </span>
                <span>{site.addressLine1}</span>
              </li>
              <li>
                <span className="footer-touch-icon" aria-hidden>
                  <Phone className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} />
                </span>
                <span>
                  <a href={`tel:${site.phone.replace(/\D/g, "")}`}>{site.phone}</a>
                  <br />
                  <a href={`tel:${site.phoneAlt.replace(/\D/g, "")}`}>{site.phoneAlt}</a>
                </span>
              </li>
              <li>
                <span className="footer-touch-icon" aria-hidden>
                  <Mail className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} />
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
