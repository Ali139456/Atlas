import Link from "next/link";
import { HeroDashboard } from "@/components/hero-dashboard";
import { HeroTitle } from "@/components/hero-title";
import { hero } from "@/lib/site-content";

export function Hero() {
  return (
    <section className="hero-wrap hero-wrap--cinematic">
      <div className="hero-shell site-container">
        <div className="hero-copy">
          <p className="hero-badge eyebrow-pill">Atlas Global Finance</p>
          <HeroTitle title={hero.title} lines={hero.titleLines} />
          <p className="hero-subtitle">{hero.subtitle}</p>
          <p className="hero-positioning">{hero.positioning}</p>
          <div className="hero-cta-row">
            <Link href={hero.primaryCtaHref} className="btn-neon hero-cta">
              {hero.primaryCta}
            </Link>
            <Link href={hero.secondaryCtaHref} className="btn-outline hero-cta">
              {hero.secondaryCta}
            </Link>
          </div>
        </div>

        <HeroDashboard />
      </div>
    </section>
  );
}
