"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/site-content";

export function HeroDashboard() {
  const { dashboard } = hero;
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`hero-dashboard${ready ? " is-ready" : ""}`} aria-hidden>
      <div className="hero-dash-glow" />

      <article className="hero-dash-card hero-dash-card--main">
        <div className="hero-dash-top">
          <p className="hero-dash-kicker">{dashboard.title}</p>
          <span className="hero-dash-live">{dashboard.balanceLabel}</span>
        </div>

        <div className="hero-dash-metrics">
          <div>
            <p className="hero-dash-label">{dashboard.incomeLabel}</p>
            <p className="hero-dash-value hero-dash-value--sm">{dashboard.incomeValue}</p>
          </div>
          <div>
            <p className="hero-dash-label">{dashboard.growthLabel}</p>
            <p className="hero-dash-value hero-dash-value--sm">{dashboard.growthValue}</p>
          </div>
        </div>

        <ul className="hero-dash-pillars">
          {dashboard.pillars.map((pillar) => (
            <li key={pillar.label} className="hero-dash-pillar">
              <strong>{pillar.label}</strong>
              <span>{pillar.value}</span>
            </li>
          ))}
        </ul>

        <div className="hero-dash-outcome">
          <p className="hero-dash-label">Outcome</p>
          <p className="hero-dash-outcome-text">{dashboard.growthHint}</p>
        </div>
      </article>
    </div>
  );
}
