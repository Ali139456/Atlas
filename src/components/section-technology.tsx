import { Check, ShieldCheck, X } from "lucide-react";
import { technologySection } from "@/lib/site-content";
import "./section-technology.css";

export function TechnologySection() {
  const { control, guardrails } = technologySection;

  return (
    <section id="technology" className="tech-sec relative section-pad overflow-hidden">
      <div className="tech-sec__bg-glow" aria-hidden />
      <div className="site-container relative z-10">
        <div className="tech-sec__intro">
          <p className="eyebrow-pill">{technologySection.eyebrow}</p>
          <h2 className="display-lg tech-sec__title text-heading">
            {technologySection.title}{" "}
            <span className="text-gradient-neon">{technologySection.titleAccent}</span>
          </h2>
          <p className="tech-sec__pillar-heading">{technologySection.brandPillar}</p>
          <p className="tech-sec__lead">{technologySection.description}</p>
        </div>

        <div className="tech-sec__cards">
          <article className="tech-sec__language">
            <p className="tech-sec__language-label">
              {technologySection.preferredLanguageLabel}
            </p>
            <ul className="tech-sec__language-list">
              {technologySection.preferredLanguage.map((item) => (
                <li key={item}>
                  <span className="tech-sec__language-dot" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <aside id="security" className="tech-sec__control">
            <div className="tech-sec__control-glow" aria-hidden />
            <p className="tech-sec__control-eyebrow">{control.eyebrow}</p>
            <p className="tech-sec__control-headline">{control.headline}</p>
            <p className="tech-sec__control-desc">{control.description}</p>
            <ul className="tech-sec__control-pillars">
              {control.pillars.map((pillar) => (
                <li key={pillar}>{pillar}</li>
              ))}
            </ul>
          </aside>
        </div>

        <article className="tech-sec__guardrails">
          <header className="tech-sec__guardrails-head">
            <span className="tech-sec__guardrails-icon" aria-hidden>
              <ShieldCheck className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.6} />
            </span>
            <p className="tech-sec__guardrails-title">{guardrails.title}</p>
          </header>

          <div className="tech-sec__guardrails-panel">
            <div className="tech-sec__guardrails-col tech-sec__guardrails-col--use">
              <p className="tech-sec__guardrails-label">Use</p>
              <ul>
                {guardrails.use.map((item) => (
                  <li key={item}>
                    <span className="tech-sec__guardrails-mark tech-sec__guardrails-mark--use">
                      <Check className="h-[0.72rem] w-[0.72rem]" strokeWidth={2} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="tech-sec__guardrails-divider" aria-hidden />

            <div className="tech-sec__guardrails-col tech-sec__guardrails-col--avoid">
              <p className="tech-sec__guardrails-label">Avoid</p>
              <ul>
                {guardrails.avoid.map((item) => (
                  <li key={item}>
                    <span className="tech-sec__guardrails-mark tech-sec__guardrails-mark--avoid">
                      <X className="h-[0.72rem] w-[0.72rem]" strokeWidth={2} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
