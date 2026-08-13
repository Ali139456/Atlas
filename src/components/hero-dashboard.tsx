import { ArrowUpRight } from "lucide-react";
import { ValuePropIcon } from "@/components/value-prop-icon";
import { hero } from "@/lib/site-content";
import "./hero-dashboard.css";

export function HeroDashboard() {
  const { dashboard } = hero;

  return (
    <div className="hero-panel" aria-hidden>
      <div className="hero-panel__aura" />
      <div className="hero-panel__ring hero-panel__ring--outer" />
      <div className="hero-panel__ring hero-panel__ring--inner" />

      <article className="hero-panel__card">
        <header className="hero-panel__head">
          <p className="hero-panel__kicker">{dashboard.title}</p>
          <span className="hero-panel__badge">
            <span className="hero-panel__badge-dot" />
            {dashboard.balanceLabel}
          </span>
        </header>

        <div className="hero-panel__hub">
          <svg className="hero-panel__links" viewBox="0 0 320 280" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="hero-panel-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 232, 240, 0.05)" />
                <stop offset="50%" stopColor="rgba(0, 232, 240, 0.55)" />
                <stop offset="100%" stopColor="rgba(0, 232, 240, 0.15)" />
              </linearGradient>
            </defs>
            <line className="hero-panel__link hero-panel__link--1" x1="160" y1="138" x2="72" y2="52" />
            <line className="hero-panel__link hero-panel__link--2" x1="160" y1="138" x2="248" y2="52" />
            <line className="hero-panel__link hero-panel__link--3" x1="160" y1="138" x2="160" y2="228" />
          </svg>

          <div className="hero-panel__core">
            <span className="hero-panel__core-eyebrow">{dashboard.growthLabel}</span>
            <strong className="hero-panel__core-value">{dashboard.growthValue}</strong>
            <span className="hero-panel__core-model">{dashboard.incomeValue}</span>
          </div>

          <ul className="hero-panel__nodes">
            {dashboard.pillars.map((pillar, index) => (
              <li
                key={pillar.label}
                className={`hero-panel__node hero-panel__node--${index + 1}`}
              >
                <span className="hero-panel__node-icon">
                  <ValuePropIcon name={pillar.icon} className="hero-panel__node-svg" />
                </span>
                <div className="hero-panel__node-copy">
                  <strong>{pillar.label}</strong>
                  <span>{pillar.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <footer className="hero-panel__outcome">
          <span className="hero-panel__outcome-icon">
            <ArrowUpRight strokeWidth={2} aria-hidden />
          </span>
          <div>
            <p className="hero-panel__outcome-label">Outcome</p>
            <p className="hero-panel__outcome-text">{dashboard.growthHint}</p>
          </div>
        </footer>
      </article>
    </div>
  );
}
