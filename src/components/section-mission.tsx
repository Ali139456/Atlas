import Image from "next/image";
import { FeatureIcon } from "@/components/feature-icon";
import { whyChooseUs } from "@/lib/site-content";

export function WhyChooseUsSection() {
  return (
    <section id="why-us" className="relative section-pad overflow-hidden">
      <div className="blob w-[500px] h-[400px] -left-1/4 top-1/2 bg-cyan-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="features-layout section-body">
          <div className="section-intro features-intro">
            <p className="eyebrow-pill">{whyChooseUs.eyebrow}</p>
            <h2 className="display-lg section-title text-white">
              {whyChooseUs.title}{" "}
              <span className="text-gradient-neon">{whyChooseUs.titleAccent}</span>
            </h2>
          </div>

          <div className="features-body">
            <ul className="features-list">
              {whyChooseUs.items.map((item) => (
                <li key={item.title}>
                  <article className="feature-row-card glass-strong glass-hover">
                    <div className="feature-row-icon">
                      <FeatureIcon name={item.icon as "expert"} className="h-6 w-6" />
                    </div>
                    <div className="feature-row-copy">
                      <h3 className="feature-row-title">{item.title}</h3>
                    </div>
                  </article>
                </li>
              ))}
            </ul>

            <div className="features-visual photo-frame">
              <Image
                src={whyChooseUs.sideImage}
                alt={whyChooseUs.sideImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
