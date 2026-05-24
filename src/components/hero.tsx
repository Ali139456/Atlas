import Link from "next/link";
import { HeroAnimatedTitle } from "@/components/hero-title";
import { hero } from "@/lib/site-content";

export function Hero() {
  return (
    <section className="hero-wrap hero-wrap--minimal">
      <div className="hero-center site-container">
        <HeroAnimatedTitle title={hero.title} lines={hero.titleLines} />
        <p className="hero-subtitle">{hero.subtitle}</p>
        <Link href={hero.primaryCtaHref} className="btn-neon hero-cta">
          {hero.primaryCta}
        </Link>
      </div>
    </section>
  );
}
