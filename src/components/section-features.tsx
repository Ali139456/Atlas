import Image from "next/image";
import { features } from "@/lib/site-content";
import { FeatureIcon } from "@/components/feature-icon";

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-mesh bg-grid section-pad overflow-hidden">
      <div className="blob w-[400px] h-[300px] right-0 top-0 bg-purple-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="section-intro">
          <p className="eyebrow-pill">{features.eyebrow}</p>
          <h2 className="display-lg section-title text-white">
            {features.title}{" "}
            <span className="text-gradient-neon">{features.titleAccent}</span>
          </h2>
        </div>

        <div className="features-bento section-body">
          {features.items.map((item) => (
            <article key={item.title} className="glass-strong glass-hover feature-tile">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="feature-photo"
              />
              <div className="feature-tile-body">
                <div className="feature-icon-wrap mb-0">
                  <FeatureIcon name={item.icon as "expert"} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-300">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}