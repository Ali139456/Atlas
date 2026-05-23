"use client";

import { useCallback, useEffect, useState } from "react";
import { clientProfiles } from "@/lib/site-content";

const AUTO_MS = 6000;

export function ClientProfilesSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const items = clientProfiles.items;

  const goTo = useCallback(
    (index: number) => {
      const total = items.length;
      setActive(((index % total) + total) % total);
    },
    [items.length],
  );

  const goPrev = () => goTo(active - 1);
  const goNext = () => goTo(active + 1);

  useEffect(() => {
    if (paused) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const id = window.setTimeout(() => goTo(active + 1), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, goTo]);

  const item = items[active];

  return (
    <section id="clients" className="clients-section relative section-pad overflow-hidden">
      <div className="blob w-[450px] h-[350px] left-0 bottom-0 bg-cyan-500/8" aria-hidden />
      <div className="site-container relative z-10">
        <div className="section-intro clients-intro">
          <p className="eyebrow-pill">{clientProfiles.eyebrow}</p>
          <h2 className="display-lg section-title text-white">
            {clientProfiles.title}{" "}
            <span className="text-gradient-neon">{clientProfiles.titleAccent}</span>
          </h2>
          <p className="clients-tagline mt-4 text-[var(--muted)]">
            {clientProfiles.description}
          </p>
        </div>

        <div
          className="clients-carousel section-body"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            className="clients-arrow clients-arrow--side"
            onClick={goPrev}
            aria-label="Previous client profile"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="clients-stage" aria-live="polite">
            <article key={active} className="client-card client-card--active glass-strong">
              <div className="client-card-body">
                <span className="client-quote" aria-hidden>
                  “
                </span>
                <p className="client-card-category text-gradient-neon">
                  Client Profiles · {item.category}
                </p>
                <p className="client-card-desc">{item.description}</p>
              </div>
              <p className="client-card-tagline">{clientProfiles.cardTagline}</p>
            </article>
          </div>

          <button
            type="button"
            className="clients-arrow clients-arrow--side"
            onClick={goNext}
            aria-label="Next client profile"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <p className="clients-slide-count" aria-live="polite">
          {active + 1} / {items.length}
        </p>
      </div>
    </section>
  );
}
