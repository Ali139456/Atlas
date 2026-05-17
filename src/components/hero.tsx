import Image from "next/image";
import Link from "next/link";
import { hero, images } from "@/lib/site-content";
import { MarqueeBand } from "@/components/marquee-band";

export function Hero() {
  return (
    <>
      <section className="hero-wrap bg-mesh bg-grid relative">
        <div
          className="blob w-[600px] h-[500px] left-1/2 -translate-x-1/2 -top-32 bg-cyan-400/15"
          aria-hidden
        />
        <div className="site-container relative z-10">
          <div className="hero-grid">
            <div className="hero-content">
              <p className="eyebrow-pill hero-eyebrow">{hero.eyebrow}</p>
              <h1 className="display-xl mt-5 text-white">
                {hero.title}
                <br />
                <span className="text-gradient-neon">{hero.titleAccent}</span>
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
                {hero.description}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="#contact" className="btn-neon">
                  {hero.primaryCta}
                </Link>
                <Link href="#services" className="btn-outline">
                  {hero.secondaryCta}
                </Link>
              </div>

              <div className="trust-row">
                <div className="relative h-10 w-28 shrink-0 overflow-hidden rounded-full border border-[var(--border)]">
                  <Image
                    src={images.trust}
                    alt=""
                    fill
                    className="trust-photo"
                    sizes="112px"
                  />
                </div>
                <p className="text-sm text-[var(--muted)]">{hero.trustLine}</p>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-orbit inset-[2%] opacity-30" aria-hidden />
              <div className="relative">
                <div className="photo-frame hero-photo-main">
                  <Image
                    src={hero.image}
                    alt={hero.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--neon)]">
                      Atlas Global Finance
                    </p>
                    <p className="mt-1 text-sm text-zinc-300">
                      Virtual · GAAP-ready · Secure
                    </p>
                  </div>
                </div>
                <div className="hero-float-card hero-float-badge glass absolute -top-2 right-0 z-20 sm:-right-4">
                  Connect your experts
                </div>
                <div className="hero-float-card hero-float-stat glass absolute -bottom-4 -left-2 z-20 sm:-left-6">
                  <p className="text-2xl font-bold text-gradient-neon">48h</p>
                  <p className="text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">
                    Report delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MarqueeBand />
    </>
  );
}
