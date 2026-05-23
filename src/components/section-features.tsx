import Image from "next/image";
import { features } from "@/lib/site-content";
import { FeatureIcon } from "@/components/feature-icon";

export function FeaturesSection() {
  return (
    <section id="features" className="relative section-pad overflow-hidden">
      <div className="blob w-[400px] h-[300px] right-0 top-0 bg-purple-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="features-layout section-body">
          <div className="features-main">
            <div className="section-intro features-intro">
              <p className="eyebrow-pill">{features.eyebrow}</p>
              <h2 className="display-lg section-title features-section-title text-white">
                <span className="features-title-line">{features.title}</span>
                <br />
                <span className="text-gradient-neon">{features.titleAccent}</span>
              </h2>
            </div>

            <ul className="features-list">
              {features.items.map((item) => (
                <li key={item.title}>
                  <article className="feature-row-card glass-strong glass-hover">
                    <div className="feature-row-icon">
                      <FeatureIcon name={item.icon as "expert"} className="h-6 w-6" />
                    </div>
                    <div className="feature-row-copy">
                      <h3 className="feature-row-title">{item.title}</h3>
                      <p className="feature-row-desc">{item.description}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          <div className="features-visual photo-frame">
            <Image
              src={features.sideImage}
              alt={features.sideImageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
