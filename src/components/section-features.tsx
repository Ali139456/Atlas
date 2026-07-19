"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { features } from "@/lib/site-content";
import "./section-features.css";

export function FeaturesSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-tl-index]"));
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      const all: Record<number, boolean> = {};
      items.forEach((_, i) => {
        all[i] = true;
      });
      setVisible(all);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.tlIndex);
          setVisible((prev) => (prev[index] ? prev : { ...prev, [index]: true }));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="benefits relative section-pad overflow-hidden">
      <div className="blob w-[420px] h-[320px] left-0 top-1/4 bg-cyan-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="benefits__intro">
          <p className="eyebrow-pill">{features.eyebrow}</p>
          <h2 className="display-lg benefits__title text-white">
            {features.title}{" "}
            <span className="text-gradient-neon">{features.titleAccent}</span>
          </h2>
          <p className="benefits__lead">
            From day one, outsourcing turns fixed finance overhead into flexible capacity —
            without slowing your core business.
          </p>
        </div>

        <div className="benefits__layout">
          <div ref={listRef} className="benefits__timeline" role="list">
            <span className="benefits__rail" aria-hidden />

            {features.items.map((item, index) => {
              const num = String(index + 1).padStart(2, "0");
              const isOn = Boolean(visible[index]);
              const hasMetric = "metric" in item && Boolean(item.metric);
              return (
                <article
                  key={item.title}
                  role="listitem"
                  data-tl-index={index}
                  className={`benefits__step${isOn ? " is-on" : ""}${hasMetric ? " benefits__step--metric" : ""}`}
                  style={{ ["--tl-delay" as string]: `${index * 60}ms` }}
                >
                  <span className="benefits__node" aria-hidden>
                    <span className="benefits__node-core" />
                  </span>

                  <div className="benefits__card">
                    <span className="benefits__index">{num}</span>

                    {hasMetric ? (
                      <>
                        <p className="benefits__metric">{item.metric}</p>
                        {"metricLabel" in item && item.metricLabel ? (
                          <p className="benefits__metric-label">{item.metricLabel}</p>
                        ) : null}
                      </>
                    ) : null}

                    <h3 className="benefits__card-title">{item.title}</h3>
                    <p className="benefits__card-desc">{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="benefits__aside">
            <div className="benefits__visual photo-frame">
              <Image
                src={features.sideImage}
                alt={features.sideImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                quality={65}
                loading="lazy"
              />
              <div className="benefits__visual-shade" aria-hidden />
              <div className="benefits__visual-caption">
                <p className="benefits__visual-kicker">Outsourced finance</p>
                <p className="benefits__visual-text">
                  Books, reporting, and controls — delivered as an extension of your team.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
