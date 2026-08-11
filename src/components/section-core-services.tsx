import Link from "next/link";
import { coreServices } from "@/lib/site-content";
import "./section-core-services.css";

export function CoreServicesSection() {
  return (
    <section id="services" className="core-svc relative section-pad overflow-hidden">
      <div className="blob w-[420px] h-[300px] right-0 bottom-0 blob--accent" aria-hidden />
      <div className="site-container relative z-10">
        <div className="core-svc__intro">
          <p className="eyebrow-pill">{coreServices.eyebrow}</p>
          <h2 className="display-lg core-svc__title text-heading">
            {coreServices.title}{" "}
            <span className="text-gradient-neon">{coreServices.titleAccent}</span>
          </h2>
          <p className="core-svc__lead">{coreServices.description}</p>
        </div>

        <div className="core-svc__grid">
          {coreServices.items.map((item) => (
            <article key={item.title} className="core-svc__card">
              <span className="core-svc__index">{item.index}</span>
              <h3 className="core-svc__card-title">{item.title}</h3>
              <p className="core-svc__card-desc">{item.description}</p>
              <Link href={item.href} className="core-svc__link">
                Learn more
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
