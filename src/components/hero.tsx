import Link from "next/link";
import { HeroDashboard } from "@/components/hero-dashboard";
import { HeroMedia } from "@/components/hero-media";
import { HeroTitle } from "@/components/hero-title";
import { hero } from "@/lib/site-content";

export function Hero() {
  return (
    <section className="hero-wrap hero-wrap--cinematic">
      <HeroMedia src={hero.videoSrc} />

      <div className="hero-shell site-container">
        <div className="hero-copy">
          <p className="hero-badge eyebrow-pill">Atlas Global Finance</p>
          <HeroTitle title={hero.title} lines={hero.titleLines} />
          <p className="hero-subtitle">{hero.subtitle}</p>
          <div className="hero-cta-row">
            <Link href={hero.primaryCtaHref} className="btn-neon hero-cta">
              {hero.primaryCta}
            </Link>
          </div>
        </div>

        <HeroDashboard />
      </div>
    </section>
  );
}
