import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/site-content";
import { ServiceIcon } from "@/components/service-icon";

export function ServicesSection() {
  return (
    <section id="services" className="relative bg-black section-pad overflow-hidden">
      <div className="blob w-[500px] h-[400px] -right-1/4 top-0 bg-cyan-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="services-layout">
          <div className="services-col">
            <p className="eyebrow-pill">{services.eyebrow}</p>
            <h2 className="display-lg section-title text-white">
              {services.title}{" "}
              <span className="text-gradient-neon">{services.titleAccent}</span>
            </h2>
            <p className="mt-4 text-sm text-[var(--muted)] lg:mt-5">{services.description}</p>
            <div className="photo-frame services-photo mt-6 hidden lg:block">
              <Image
                src={services.image}
                alt={services.imageAlt}
                fill
                sizes="(max-width: 1024px) 50vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          <ul className="services-stack">
            {services.items.map((s, i) => (
              <li key={s.title}>
                <article className="glass-strong glass-hover service-panel">
                  <span className="service-panel-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="service-panel-main">
                    <div className="service-panel-icon">
                      <ServiceIcon name={s.icon} className="h-3.5 w-3.5" />
                    </div>
                    <div className="service-panel-text">
                      <h3>{s.title}</h3>
                      <p>{s.description}</p>
                    </div>
                  </div>
                  <Link href="#contact" className="service-panel-link">
                    Know more →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
