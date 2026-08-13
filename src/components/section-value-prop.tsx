import { ArrowRight } from "lucide-react";
import { valueProposition } from "@/lib/site-content";
import { ValuePropIcon } from "@/components/value-prop-icon";
import "./section-value-prop.css";

export function ValuePropositionSection() {
  return (
    <section id="value" className="value-prop relative section-pad overflow-hidden">
      <div className="value-prop__bg" aria-hidden>
        <span className="value-prop__ring value-prop__ring--tl" />
        <span className="value-prop__ring value-prop__ring--br" />
        <span className="value-prop__dots value-prop__dots--left" />
        <span className="value-prop__dots value-prop__dots--right" />
      </div>

      <div className="blob w-[480px] h-[320px] left-1/2 top-0 -translate-x-1/2 blob--accent value-prop__blob" aria-hidden />

      <div className="site-container relative z-10">
        <div className="value-prop__intro">
          <p className="eyebrow-pill value-prop__eyebrow">{valueProposition.eyebrow}</p>
          <h2 className="display-lg value-prop__title text-heading">
            {valueProposition.title}
            <span className="value-prop__title-break" aria-hidden>
              {" "}
            </span>
            <span className="text-gradient-neon">{valueProposition.titleAccent}</span>
          </h2>
          <p className="value-prop__lead">{valueProposition.description}</p>
        </div>

        <ol className="value-prop__flow">
          {valueProposition.flow.map((step, index) => (
            <li key={step.title} className="value-prop__step">
              <article className="value-prop__card">
                <span className="value-prop__index" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="value-prop__icon-wrap" aria-hidden>
                  <ValuePropIcon name={step.icon} className="value-prop__icon" />
                </span>
                <h3 className="value-prop__card-title">{step.title}</h3>
                <p className="value-prop__card-desc">{step.description}</p>
              </article>
              {index < valueProposition.flow.length - 1 ? (
                <span className="value-prop__connector" aria-hidden>
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
