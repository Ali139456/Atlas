import { whyChooseUs } from "@/lib/site-content";
import "./section-why-us.css";

function VisualSavings() {
  return (
    <div className="why-visual why-visual--savings" aria-hidden>
      <p className="why-visual__metric">40–60%</p>
      <p className="why-visual__caption">typical savings vs in-house staffing</p>
      <div className="why-visual__bars">
        <span style={{ height: "42%" }} />
        <span style={{ height: "58%" }} />
        <span style={{ height: "70%" }} />
        <span className="is-hot" style={{ height: "92%" }} />
      </div>
    </div>
  );
}

function VisualAvatars() {
  return (
    <div className="why-visual why-visual--avatars" aria-hidden>
      <div className="why-visual__avatar-row">
        {["AG", "MK", "SR", "JL"].map((initials) => (
          <span key={initials} className="why-visual__avatar">
            {initials}
          </span>
        ))}
      </div>
      <p className="why-visual__caption">FTE · part-time · as-needed coverage</p>
    </div>
  );
}

function VisualControl() {
  return (
    <div className="why-visual why-visual--control" aria-hidden>
      <div className="why-visual__panel">
        <div className="why-visual__panel-top">
          <span>Close status</span>
          <strong>On track</strong>
        </div>
        <div className="why-visual__spark">
          {[40, 55, 48, 68, 62, 78, 88].map((h, i) => (
            <span key={i} className={i > 4 ? "is-hot" : undefined} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function VisualTech() {
  return (
    <div className="why-visual why-visual--tech" aria-hidden>
      <span className="why-visual__orb" />
      <span className="why-visual__node why-visual__node--a" />
      <span className="why-visual__node why-visual__node--b" />
      <span className="why-visual__node why-visual__node--c" />
      <span className="why-visual__node why-visual__node--d" />
      <span className="why-visual__ring" />
    </div>
  );
}

function VisualProcess() {
  const steps = [
    "Scope",
    "Kickoff",
    "Close cycle",
    "Reporting",
    "Review",
    "Optimize",
  ];
  return (
    <div className="why-visual why-visual--process" aria-hidden>
      <div className="why-visual__steps">
        {steps.map((step, index) => (
          <div key={step} className="why-visual__step" style={{ ["--i" as string]: index }}>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const visuals = [
  VisualSavings,
  VisualAvatars,
  VisualControl,
  VisualTech,
  VisualProcess,
] as const;

export function WhyChooseUsSection() {
  return (
    <section id="why-us" className="why-us relative section-pad overflow-hidden">
      <div className="blob w-[520px] h-[360px] left-1/2 top-0 -translate-x-1/2 bg-cyan-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="why-us__intro">
          <p className="eyebrow-pill">{whyChooseUs.eyebrow}</p>
          <h2 className="display-lg why-us__title text-white">
            {whyChooseUs.title}{" "}
            <span className="text-gradient-neon">{whyChooseUs.titleAccent}</span>
          </h2>
          {whyChooseUs.description ? (
            <p className="why-us__lead">{whyChooseUs.description}</p>
          ) : null}
        </div>

        <div className="why-us__grid">
          {whyChooseUs.items.map((item, index) => {
            const Visual = visuals[index] ?? VisualTech;
            const wide = index === whyChooseUs.items.length - 1;
            return (
              <article
                key={item.title}
                className={`why-us__card${wide ? " why-us__card--wide" : ""}`}
              >
                <div className="why-us__card-visual">
                  <Visual />
                </div>
                <h3 className="why-us__card-title">{item.title}</h3>
                <p className="why-us__card-desc">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
