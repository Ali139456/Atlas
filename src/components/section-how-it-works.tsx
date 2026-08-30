import { howItWorks as defaultHowItWorks } from "@/lib/site-content";
import "./section-how-it-works.css";

export function HowItWorksSection({
  content = defaultHowItWorks,
}: {
  content?: typeof defaultHowItWorks;
}) {
  return (
    <section id="how-it-works" className="how-works relative section-pad overflow-hidden">
      <div className="blob w-[420px] h-[300px] right-0 top-0 blob--accent" aria-hidden />
      <div className="site-container relative z-10">
        <div className="how-works__intro">
          <p className="eyebrow-pill">{content.eyebrow}</p>
          <h2 className="display-lg how-works__title text-heading">
            {content.title}{" "}
            <span className="text-gradient-neon">{content.titleAccent}</span>
          </h2>
          <p className="how-works__lead">{content.description}</p>
        </div>

        <ol className="how-works__steps">
          {content.steps.map((step) => (
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
