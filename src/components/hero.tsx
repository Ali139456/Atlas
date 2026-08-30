import Link from "next/link";
import { HeroDashboard } from "@/components/hero-dashboard";
import { HeroTitle } from "@/components/hero-title";
import { hero as defaultHero } from "@/lib/site-content";

type HeroContent = typeof defaultHero;

export function Hero({ content = defaultHero }: { content?: HeroContent }) {
  return (
    <section className="hero-wrap hero-wrap--cinematic">
      <div className="hero-shell site-container">
        <div className="hero-copy">
          <p className="hero-badge eyebrow-pill">
            {"badge" in content && typeof content.badge === "string"
              ? content.badge
              : "Atlas Global Finance"}
          </p>
          <HeroTitle title={content.title} lines={content.titleLines} />
          <p className="hero-subtitle">{content.subtitle}</p>
          <p className="hero-positioning">{content.positioning}</p>
          <div className="hero-cta-row">
            <Link href={content.primaryCtaHref} className="btn-neon hero-cta">
              {content.primaryCta}
            </Link>
            <Link href={content.secondaryCtaHref} className="btn-outline hero-cta">
              {content.secondaryCta}
            </Link>
          </div>
        </div>

        <HeroDashboard dashboard={content.dashboard} />
      </div>
    </section>
  );
}
