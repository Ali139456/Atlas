import Image from "next/image";
import Link from "next/link";
import { industriesServed } from "@/lib/site-content";
import "./section-industries.css";

export function IndustriesServedSection() {
  return (
    <section
      id="industries"
      className="industries-section relative section-pad overflow-hidden"
    >
      <div className="blob w-[480px] h-[360px] right-0 bottom-0 blob--accent" aria-hidden />
      <div className="blob w-[360px] h-[280px] left-0 top-1/3 blob--accent-soft" aria-hidden />

      <div className="site-container relative z-10">
        <div className="industries-header">
          <p className="eyebrow-pill">{industriesServed.eyebrow}</p>
          <h2 className="display-lg industries-title text-heading">
            {industriesServed.title}{" "}
            <span className="text-gradient-neon">{industriesServed.titleAccent}</span>
          </h2>
          <p className="industries-lead">{industriesServed.description}</p>
        </div>

        <div className="industries-grid industries-grid--lead">
          {industriesServed.items.map((item) => (
            <Link
              key={item.slug}
              href={`/industries/${item.slug}`}
              className="industry-card industry-card--lead group"
            >
              <span className="industry-card-frame" aria-hidden />
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="industry-card-img object-cover"
                quality={60}
                loading="lazy"
              />
              <div className="industry-card-overlay" aria-hidden />
              <div className="industry-card-content industry-card-content--lead">
                <span className="industry-card-index">{item.index}</span>
                <p className="industry-card-title">{item.title}</p>
                <p className="industry-card-desc">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {industriesServed.moreItems.length > 0 ? (
          <div className="industries-more">
            <p className="industries-more__label">{industriesServed.moreLabel}</p>
            <div className="industries-more__links">
              {industriesServed.moreItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/industries/${item.slug}`}
                  className="industries-more__link"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
