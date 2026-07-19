"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/site-content";

function useCountUp(target: number, ready: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!ready) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ready, target, duration]);

  return value;
}

function parseMoney(raw: string) {
  const digits = Number(raw.replace(/[^0-9]/g, ""));
  return Number.isFinite(digits) ? digits : 0;
}

function formatMoney(value: number, template: string) {
  const formatted = value.toLocaleString("en-US");
  if (template.includes("$")) return `$${formatted}`;
  return formatted;
}

function parsePercent(raw: string) {
  const digits = Number(raw.replace(/[^0-9.]/g, ""));
  return Number.isFinite(digits) ? digits : 0;
}

export function HeroDashboard() {
  const { dashboard } = hero;
  const max = Math.max(...dashboard.chart);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const balanceTarget = parseMoney(dashboard.balanceValue);
  const growthTarget = parsePercent(dashboard.growthValue);
  const balance = useCountUp(balanceTarget, ready, 1400);
  const growth = useCountUp(growthTarget, ready, 1100);

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
          <span className="hero-dash-live">Live</span>
        </div>

        <div className="hero-dash-metrics">
          <div>
            <p className="hero-dash-label">{dashboard.balanceLabel}</p>
            <p className="hero-dash-value">
              {formatMoney(balance, dashboard.balanceValue)}
            </p>
          </div>
          <div>
            <p className="hero-dash-label">{dashboard.incomeLabel}</p>
            <p className="hero-dash-value hero-dash-value--sm">{dashboard.incomeValue}</p>
          </div>
        </div>

        <div className="hero-dash-chart">
          {dashboard.chart.map((value, index) => (
            <div key={dashboard.chartLabels[index]} className="hero-dash-bar-wrap">
              <div
                className="hero-dash-bar"
                style={{
                  ["--bar-h" as string]: `${Math.round((value / max) * 100)}%`,
                  ["--bar-delay" as string]: `${index * 90}ms`,
                  transitionDelay: `${120 + index * 70}ms`,
                }}
              />
              <span>{dashboard.chartLabels[index]}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="hero-dash-card hero-dash-card--growth">
        <p className="hero-dash-label">{dashboard.growthLabel}</p>
        <p className="hero-dash-growth">{growth}%</p>
        <p className="hero-dash-hint">{dashboard.growthHint}</p>
      </article>

      <article className="hero-dash-card hero-dash-card--goal">
        <p className="hero-dash-goal-title">
          Achieve
          <br />
          Financial
          <br />
          Goals
        </p>
        <span className="hero-dash-goal-ring" />
      </article>
    </div>
  );
}
