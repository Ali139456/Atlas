import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/site-content";

const linkGroups = [
  {
    title: "Services",
    links: [
      { href: "#services", label: "Bookkeeping" },
      { href: "#services", label: "Reporting" },
      { href: "#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#mission", label: "About" },
      { href: "#process", label: "Process" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" aria-label={`${site.brand} — home`} className="footer-logo-link">
              <Image
                src="/atlas-logo.png"
                alt=""
                width={400}
                height={500}
                className="footer-logo"
              />
            </Link>
            <p className="footer-tagline">
              Precision virtual bookkeeping and financial reporting for businesses that
              demand excellence.
            </p>
            <Link href="#contact" className="footer-cta">
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

            <div className="footer-col">
              <p className="footer-col-title">Contact</p>
              <ul className="footer-contact-list">
                <li>{site.address}</li>
                <li>
                  <a href={`tel:${site.phone.replace(/\D/g, "")}`}>{site.phone}</a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
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
          <a href="#" className="footer-top-link">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
