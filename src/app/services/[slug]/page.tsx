import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </li>
                <li>
                  <Link href={homeAnchors.services}>Services</Link>
                </li>
                <li className="service-breadcrumb-sep" aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </li>
                <li className="service-breadcrumb-current" aria-current="page">
                  <span>{category.shortTitle}</span>
                </li>
              </ol>
            </nav>

            <header className="service-detail-hero">
              <div className="service-detail-copy">
                <div className="service-detail-hero-top">
                  <div className="service-detail-hero-icon">
                    <ServiceCategoryIcon name={category.icon} className="h-8 w-8" />
                  </div>
                  <p className="eyebrow-pill service-detail-eyebrow">{site.brand}</p>
                </div>
                <h1 className="display-lg mt-4 text-heading">{category.title}</h1>
                <p className="service-detail-lead">{category.description}</p>
                <p className="service-detail-summary">{category.summary}</p>
              </div>

              <div className="service-detail-visual photo-frame">
                <Image
                  src={category.heroImage}
                  alt={`${category.title} accounting services`}
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, 46vw"
                  className="object-cover"
                  quality={75}
                />
                <div className="service-detail-visual-overlay" aria-hidden />
              </div>
            </header>

            <section className="service-capabilities" aria-labelledby="service-capabilities-heading">
                  <div className="service-capabilities-head">
                    <p className="service-capabilities-eyebrow">Capabilities</p>
                    <h2 id="service-capabilities-heading" className="service-capabilities-title display-lg">
                      What we deliver for{" "}
                      <span className="text-gradient-neon">{category.shortTitle}</span>
                    </h2>
                    <p className="service-capabilities-count">
                      {category.subServices.length} focused workflows
                    </p>
                  </div>

                  <ul className="service-capabilities-list">
                    {category.subServices.map((sub, index) => (
                      <li key={sub.title} className="service-capability">
                        <div className="service-capability-media">
                          <Image
                            src={sub.image}
                            alt={sub.title}
                            fill
                            sizes="(max-width: 767px) 100vw, 220px"
                            className="object-cover"
                            quality={75}
                            loading="lazy"
                          />
                        </div>
                        <div className="service-capability-body">
                          <span className="service-capability-index">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <h3 className="service-capability-title">{sub.title}</h3>
                          <p className="service-capability-desc">{sub.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                <nav className="service-tabs service-tabs--end" aria-label="Service categories">
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
