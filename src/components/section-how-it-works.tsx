import { howItWorks } from "@/lib/site-content";
import "./section-how-it-works.css";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="how-works relative section-pad overflow-hidden">
      <div className="blob w-[420px] h-[300px] right-0 top-0 blob--accent" aria-hidden />
      <div className="site-container relative z-10">
        <div className="how-works__intro">
          <p className="eyebrow-pill">{howItWorks.eyebrow}</p>
          <h2 className="display-lg how-works__title text-heading">
            {howItWorks.title}{" "}
            <span className="text-gradient-neon">{howItWorks.titleAccent}</span>
          </h2>
          <p className="how-works__lead">{howItWorks.description}</p>
        </div>

        <ol className="how-works__steps">
          {howItWorks.steps.map((step) => (
            <li key={step.title} className="how-works__step">
              <span className="how-works__index">{step.index}</span>
              <h3 className="how-works__step-title">{step.title}</h3>
              <p className="how-works__step-desc">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
