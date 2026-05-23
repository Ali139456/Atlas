import Image from "next/image";
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

      <div className="hero-certs">
        <div className="site-container hero-certs-inner">
          <Image
            src={hero.certStrip}
            alt="SOC 2 Type II, ISO 27001, and Great Place To Work certifications"
            width={1200}
            height={160}
            className="hero-certs-img"
            priority
          />
        </div>
      </div>
    </section>
  );
}
