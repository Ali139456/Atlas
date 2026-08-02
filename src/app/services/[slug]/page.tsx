import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceCategoryIcon } from "@/components/service-category-icon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "../service-detail.css";
import {
  getAllServiceSlugs,
  getServiceCategory,
  serviceCategories,
} from "@/lib/service-categories";
import { homeAnchors, site, siteCta } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getServiceCategory(slug);
  if (!category) return { title: "Service not found" };
  return {
    title: category.title,
    description: category.description,
  };
}

export default async function ServiceCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getServiceCategory(slug);
  if (!category) notFound();

  return (
    <>
      <SiteHeader />
      <main className="site-main section-bg">
        <section className="service-detail-page relative section-pad overflow-hidden">
          <div className="blob w-[480px] h-[360px] left-1/2 -translate-x-1/2 top-0 blob--accent-soft" aria-hidden />
          <div className="site-container relative z-10">
            <nav className="service-breadcrumb" aria-label="Breadcrumb">
              <ol className="service-breadcrumb-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li className="service-breadcrumb-sep" aria-hidden>
                  <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                    <path
                      d="M6 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </li>
                <li>
                  <Link href={homeAnchors.services}>Services</Link>
                </li>
                <li className="service-breadcrumb-sep" aria-hidden>
                  <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                    <path
                      d="M6 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </li>
                <li className="service-breadcrumb-current" aria-current="page">
                  <span>{category.shortTitle}</span>
                </li>
              </ol>
            </nav>

            <header className="service-detail-hero">
              <div className="service-detail-hero-top">
                <div className="service-detail-hero-icon">
                  <ServiceCategoryIcon name={category.icon} className="h-8 w-8" />
                </div>
                <p className="eyebrow-pill service-detail-eyebrow">{site.brand}</p>
              </div>
              <h1 className="display-lg mt-4 text-heading">{category.title}</h1>
              <p className="service-detail-lead">{category.description}</p>
              <p className="service-detail-summary">{category.summary}</p>
            </header>

            <nav className="service-tabs" aria-label="Service categories">
              {serviceCategories.map((item, tabIndex) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className={`service-tab service-tab--${tabIndex + 1}${item.slug === category.slug ? " is-active" : ""}`}
                  aria-current={item.slug === category.slug ? "page" : undefined}
                >
                  {item.shortTitle}
                </Link>
              ))}
            </nav>

            <div className="service-subs-list-wrap">
              <div className="service-subs-head">
                <p className="service-subs-heading">
                  What we deliver for <span>{category.shortTitle}</span>
                </p>
                <p className="service-subs-count">
                  {category.subServices.length} capabilities
                </p>
              </div>
              <ul className="service-subs-grid">
                {category.subServices.map((sub, index) => (
                  <li
                    key={sub.title}
                    className={`service-subs-card service-subs-card--${(index % 4) + 1}`}
                  >
                    <span className="service-subs-index">{String(index + 1).padStart(2, "0")}</span>
                    <div className="service-subs-content">
                      <h2 className="service-subs-title">{sub.title}</h2>
                      <p className="service-subs-desc">{sub.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="service-detail-footer">
              <p className="text-[var(--muted)]">
                Ready to outsource {category.shortTitle.toLowerCase()} workflows?
              </p>
              <div className="service-detail-footer-actions">
                <Link href={siteCta.href} className="btn-neon">
                  {siteCta.label}
                </Link>
                <Link href={homeAnchors.services} className="btn-outline">
                  View all services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
