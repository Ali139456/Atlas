import { whyChooseUs } from "@/lib/site-content";
import "./section-why-us.css";

function WhyPoint({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <article className="why-us__point">
      <span className="why-us__point-index">{index}</span>
      <div className="why-us__point-copy">
        <h3 className="why-us__point-title">{title}</h3>
        <p className="why-us__point-desc">{description}</p>
      </div>
    </article>
  );
}

export function WhyChooseUsSection() {
  const leftPoints = whyChooseUs.items.slice(0, 3);
  const rightPoints = whyChooseUs.items.slice(3);

  return (
    <section id="why-us" className="why-us relative section-pad overflow-hidden">
      <div className="blob w-[520px] h-[360px] right-0 top-1/4 blob--accent-soft" aria-hidden />

      <div className="site-container relative z-10">
        <header className="why-us__header">
          <p className="eyebrow-pill">{whyChooseUs.eyebrow}</p>
          <h2 className="display-lg why-us__title text-heading">
            {whyChooseUs.title}{" "}
            <span className="text-gradient-neon">{whyChooseUs.titleAccent}</span>
          </h2>
          <p className="why-us__subtitle">{whyChooseUs.subtitle}</p>
        </header>

        <div className="why-us__intro">
          {whyChooseUs.intro.map((paragraph) => (
            <p key={paragraph} className="why-us__intro-text">
              {paragraph}
            </p>
          ))}
          <p className="why-us__intro-emphasis">{whyChooseUs.emphasis}</p>
          <p className="why-us__intro-text">{whyChooseUs.efficiencyLead}</p>
        </div>

        <div className="why-us__columns">
          <div className="why-us__column">
            {leftPoints.map((item) => (
              <WhyPoint key={item.title} {...item} />
            ))}
          </div>

          <div className="why-us__column">
            {rightPoints.map((item) => (
              <WhyPoint key={item.title} {...item} />
            ))}
          </div>
        </div>

        <div className="why-us__mission">
          <p className="why-us__mission-label">{whyChooseUs.mission.title}</p>
          <p className="why-us__mission-text">{whyChooseUs.mission.description}</p>
        </div>
      </div>
    </section>
  );
}
