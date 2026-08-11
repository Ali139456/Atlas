import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getAllIndustrySlugs,
  getIndustry,
  industries,
} from "@/lib/industries";
import { homeAnchors, site, siteCta } from "@/lib/site-content";
import "../../services/service-detail.css";
import "../industry-detail.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return { title: "Industry not found" };
  return {
    title: `${industry.title} Accounting`,
    description: industry.description,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <>
      <SiteHeader />
      <main className="site-main section-bg">
        <section className="industry-detail-page service-detail-page relative section-pad overflow-hidden">
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
                  <Link href={homeAnchors.industries}>Industries</Link>
                </li>
                <li className="service-breadcrumb-sep" aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </li>
                <li className="service-breadcrumb-current" aria-current="page">
                  <span>{industry.shortTitle}</span>
                </li>
              </ol>
            </nav>

            <header className="industry-detail-hero">
              <div className="industry-detail-copy">
                <p className="eyebrow-pill">{site.brand}</p>
                <h1 className="display-lg mt-4 text-heading">{industry.title}</h1>
                <p className="industry-detail-lead">{industry.description}</p>
                <p className="industry-detail-summary">{industry.summary}</p>
                <div className="industry-detail-highlights">
                  {industry.highlights.map((item) => (
                    <span key={item} className="industry-detail-highlight">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="industry-detail-visual photo-frame">
                <Image
                  src={industry.heroImage}
                  alt={`${industry.title} accounting and finance support`}
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, 46vw"
                  className="object-cover"
                  quality={75}
                />
                <div className="industry-detail-visual-overlay" aria-hidden />
              </div>
            </header>

            <section className="industry-block industry-block--challenges" aria-labelledby="industry-challenges-heading">
              <div className="industry-section-head industry-section-head--wide">
                <p className="industry-section-eyebrow">Pain points</p>
                <h2 id="industry-challenges-heading" className="industry-section-title display-lg">
                  Challenges in{" "}
                  <span className="text-gradient-neon">{industry.shortTitle.toLowerCase()}</span>
                </h2>
                <p className="industry-section-lead">
                  Common finance bottlenecks we see across {industry.shortTitle.toLowerCase()} teams.
                </p>
              </div>
              <ul className="industry-challenges">
                {industry.challenges.map((item, index) => (
                  <li
                    key={item.title}
                    className={`industry-challenge industry-challenge--${index + 1}`}
                  >
                    <article className="industry-challenge-inner">
                      <span className="industry-challenge-watermark" aria-hidden>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="industry-challenge-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="industry-challenge-title">{item.title}</h3>
                      <p className="industry-challenge-desc">{item.description}</p>
                      <span className="industry-challenge-accent" aria-hidden />
                    </article>
                  </li>
                ))}
              </ul>
            </section>

            <section className="industry-block industry-block--solutions" aria-labelledby="industry-solutions-heading">
              <div className="industry-section-head">
                <h2 id="industry-solutions-heading" className="industry-section-title">
                  How Atlas supports <span>{industry.shortTitle.toLowerCase()}</span>
                </h2>
                <p className="industry-section-lead">
                  Practical accounting support mapped to your operating model.
                </p>
              </div>
              <div className="industry-solutions-layout">
                <ol className="industry-solutions">
                  {industry.solutions.map((item, index) => (
                    <li key={item.title} className="industry-solution">
                      <span className="industry-solution-num">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="industry-solution-body">
                        <h3 className="industry-solution-title">{item.title}</h3>
                        <p className="industry-solution-desc">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <aside className="industry-solutions-visual">
                  <div className="industry-solutions-visual-frame">
                    <Image
                      src={industry.dashboardImage}
                      alt={`${industry.shortTitle} finance dashboard and reporting preview`}
                      fill
                      sizes="(max-width: 1023px) 100vw, 38vw"
                      className="industry-solutions-visual-img"
                      quality={85}
                      priority={industry.slug === "logistics-transportation"}
                      loading={industry.slug === "logistics-transportation" ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="industry-solutions-visual-caption">
                    <p className="industry-solutions-visual-kicker">
                      {industry.shortTitle} finance view
                    </p>
                    <p className="industry-solutions-visual-text">
                      Reporting, reconciliations, and close support — tailored to your industry.
                    </p>
                  </div>
                </aside>
              </div>
            </section>

            <nav className="industry-tabs industry-tabs--end" aria-label="Industries">
              {industries.map((item) => (
                <Link
                  key={item.slug}
                  href={`/industries/${item.slug}`}
                  className={`industry-tab${item.slug === industry.slug ? " is-active" : ""}`}
                  aria-current={item.slug === industry.slug ? "page" : undefined}
                >
                  {item.shortTitle}
                </Link>
              ))}
            </nav>

            <div className="industry-detail-footer">
              <p className="text-[var(--muted)]">
                Ready to outsource accounting for {industry.title.toLowerCase()}?
              </p>
              <div className="industry-detail-footer-actions">
                <Link href={siteCta.href} className="btn-neon">
                  {siteCta.label}
                </Link>
                <Link href={homeAnchors.industries} className="btn-outline">
                  View all industries
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
