import { Star } from "lucide-react";
import { whyChooseUs } from "@/lib/site-content";
import { WhyUsMissionIcon, WhyUsPointIcon } from "@/components/why-us-icon";
import { WhyUsVisual } from "@/components/why-us-visual";
import "./section-why-us.css";

function WhyPoint({
  index,
  title,
  description,
  pointIndex,
}: {
  index: string;
  title: string;
  description: string;
  pointIndex: number;
}) {
  return (
    <article className="why-us__card">
      <span className="why-us__card-icon" aria-hidden>
        <WhyUsPointIcon index={pointIndex} className="why-us__card-icon-svg" />
      </span>
      <div className="why-us__card-body">
        <div className="why-us__card-head">
          <span className="why-us__card-index">{index}</span>
          <span className="why-us__card-rule" aria-hidden />
          <h3 className="why-us__card-title">{title}</h3>
        </div>
        <p className="why-us__card-desc">{description}</p>
      </div>
    </article>
  );
}

export function WhyChooseUsSection() {
  const leftPoints = whyChooseUs.items.slice(0, 3);
  const rightPoints = whyChooseUs.items.slice(3);

  return (
    <section id="why-us" className="why-us relative section-pad overflow-hidden">
      <div className="blob w-[520px] h-[360px] right-0 top-1/4 blob--accent-soft why-us__blob" aria-hidden />

      <div className="site-container relative z-10">
        <div className="why-us__hero">
          <header className="why-us__hero-copy">
            <p className="eyebrow-pill">{whyChooseUs.eyebrow}</p>
            <h2 className="display-lg why-us__title text-heading">
              {whyChooseUs.title}{" "}
              <span className="text-gradient-neon">{whyChooseUs.titleAccent}</span>
            </h2>
            <p className="why-us__subtitle">{whyChooseUs.subtitle}</p>
            {whyChooseUs.intro.map((paragraph) => (
              <p key={paragraph} className="why-us__intro-text">
                {paragraph}
              </p>
            ))}
          </header>

          <WhyUsVisual />
        </div>

        <div className="why-us__callout">
          <span className="why-us__callout-icon" aria-hidden>
            <Star className="h-5 w-5" strokeWidth={1.65} />
          </span>
          <div className="why-us__callout-copy">
            <p className="why-us__callout-emphasis">{whyChooseUs.emphasis}</p>
            <p className="why-us__callout-text">{whyChooseUs.efficiencyLead}</p>
          </div>
        </div>

        <div className="why-us__grid">
          <div className="why-us__column">
            {leftPoints.map((item, index) => (
              <WhyPoint key={item.title} {...item} pointIndex={index} />
            ))}
          </div>

          <div className="why-us__column">
            {rightPoints.map((item, index) => (
              <WhyPoint key={item.title} {...item} pointIndex={index + 3} />
            ))}
          </div>
        </div>

        <div className="why-us__callout why-us__mission">
          <span className="why-us__callout-icon" aria-hidden>
            <WhyUsMissionIcon className="h-5 w-5" />
          </span>
          <div className="why-us__callout-copy">
            <p className="why-us__callout-emphasis">{whyChooseUs.mission.title}</p>
            <p className="why-us__callout-text">{whyChooseUs.mission.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
