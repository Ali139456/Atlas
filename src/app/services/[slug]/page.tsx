import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ServicePageIcon } from "@/components/service-page-icon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  coreServicesData,
  getAllCoreServiceSlugs,
  getCoreService,
} from "@/lib/core-services";
import { homeAnchors, siteCta } from "@/lib/site-content";
import "../service-detail.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllCoreServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getCoreService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function CoreServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getCoreService(slug);
  if (!service) notFound();

  return (
    <>
      <SiteHeader />
      <main className="site-main section-bg">
        <section className="svc-page relative section-pad overflow-hidden">
          <div className="svc-page__glow svc-page__glow--left" aria-hidden />
          <div className="svc-page__glow svc-page__glow--right" aria-hidden />

          <div className="site-container relative z-10">
            <nav className="svc-page__crumb" aria-label="Breadcrumb">
              <ol className="svc-page__crumb-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li className="svc-page__crumb-sep" aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </li>
                <li>
                  <Link href={homeAnchors.services}>Services</Link>
                </li>
                <li className="svc-page__crumb-sep" aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </li>
                <li className="svc-page__crumb-current" aria-current="page">
                  <span>{service.shortTitle}</span>
                </li>
              </ol>
            </nav>

            <nav className="svc-page__switcher" aria-label="Core services">
              {coreServicesData.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className={`svc-page__switch${item.slug === service.slug ? " is-active" : ""}`}
                  aria-current={item.slug === service.slug ? "page" : undefined}
                >
                  <span className="svc-page__switch-index">{item.index}</span>
                  {item.shortTitle}
                </Link>
              ))}
            </nav>

            <header className="svc-page__hero">
              <div className="svc-page__hero-main">
                <div className="svc-page__hero-top">
                  <span className="svc-page__hero-index">{service.index}</span>
                  <span className="svc-page__hero-icon" aria-hidden>
                    <ServicePageIcon name={service.icon} className="h-5 w-5" />
                  </span>
                  <p className="eyebrow-pill svc-page__eyebrow">Core service</p>
                </div>

                <h1 className="display-lg svc-page__title text-heading">{service.title}</h1>
                <p className="svc-page__lead">{service.summary}</p>
                <p className="svc-page__overview">{service.overview}</p>

                <div className="svc-page__hero-actions">
                  <Link href={siteCta.href} className="btn-neon svc-page__cta">
                    {siteCta.label}
                  </Link>
                  <Link href={homeAnchors.services} className="btn-outline svc-page__cta">
                    All services
                  </Link>
                </div>
              </div>

              <aside className="svc-page__hero-aside">
                <p className="svc-page__aside-label">What clients gain</p>
                <ul className="svc-page__aside-list">
                  {service.outcomes.map((item) => (
                    <li key={item}>
                      <span className="svc-page__aside-check" aria-hidden>
                        <Check className="h-3.5 w-3.5" strokeWidth={2.25} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </header>

            <section className="svc-page__capabilities" aria-labelledby="svc-cap-heading">
              <div className="svc-page__section-head">
                <p className="svc-page__section-eyebrow">Capabilities</p>
                <h2 id="svc-cap-heading" className="svc-page__section-title display-lg text-heading">
                  What we handle for{" "}
                  <span className="text-gradient-neon">{service.shortTitle.toLowerCase()}</span>
                </h2>
              </div>

              <ul className="svc-page__cap-grid">
                {service.capabilities.map((item, index) => (
                  <li key={item.title}>
                    <article className="svc-page__cap-card">
                      <div className="svc-page__cap-head">
                        <span className="svc-page__cap-index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="svc-page__cap-icon" aria-hidden>
                          <ServicePageIcon name={service.icon} className="h-4 w-4" />
                        </span>
                      </div>
                      <h3 className="svc-page__cap-title">{item.title}</h3>
                      <p className="svc-page__cap-desc">{item.description}</p>
                    </article>
                  </li>
                ))}
              </ul>
            </section>

            <footer className="svc-page__footer">
              <div className="svc-page__footer-copy">
                <p className="svc-page__footer-eyebrow">Next step</p>
                <p className="svc-page__footer-title">
                  Ready to strengthen your {service.shortTitle.toLowerCase()} workflow?
                </p>
                <p className="svc-page__footer-text">
                  Tell us about your current process and we will outline how Atlas can support it.
                </p>
              </div>
              <Link href={siteCta.href} className="btn-neon svc-page__footer-btn">
                {siteCta.label}
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Link>
            </footer>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
