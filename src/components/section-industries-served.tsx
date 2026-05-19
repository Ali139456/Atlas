"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { industriesServed } from "@/lib/site-content";

export function IndustriesServedSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = industriesServed.items;

  const scrollToIndex = useCallback((index: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(index, items.length - 1));
    const slide = track.children[next] as HTMLElement | undefined;
    if (slide) {
      track.scrollTo({
        left: slide.offsetLeft,
        behavior: smooth ? "smooth" : "instant",
      });
    }
    setActive(next);
  }, [items.length]);

  const goPrev = () => scrollToIndex(active - 1);
  const goNext = () => scrollToIndex(active + 1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const slides = Array.from(track.children) as HTMLElement[];
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      slides.forEach((slide, i) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const dist = Math.abs(center - slideCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActive(closest);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const canPrev = active > 0;
  const canNext = active < items.length - 1;

  return (
    <section
      id="industries"
      className="industries-section relative bg-mesh bg-grid section-pad overflow-hidden"
    >
      <div className="blob w-[450px] h-[350px] right-0 bottom-0 bg-cyan-500/8" aria-hidden />
      <div className="site-container relative z-10">
        <div className="industries-header">
          <div className="section-intro">
            <p className="eyebrow-pill">{industriesServed.eyebrow}</p>
            <h2 className="display-lg section-title text-white">
              {industriesServed.title}{" "}
              <span className="text-gradient-neon">{industriesServed.titleAccent}</span>
            </h2>
            <p className="mt-4 max-w-xl text-[var(--muted)]">{industriesServed.description}</p>
          </div>
          <div className="industries-arrows">
            <button
              type="button"
              className="industries-arrow"
              onClick={goPrev}
              disabled={!canPrev}
              aria-label="Previous industry"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="industries-arrow"
              onClick={goNext}
              disabled={!canNext}
              aria-label="Next industry"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="industries-carousel section-body">
          <div ref={trackRef} className="industries-track">
            {items.map((item) => (
              <Link
                key={item.title}
                href="/#contact"
                className="industry-card group"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 85vw, 280px"
                  className="industry-card-img object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="industry-card-overlay" aria-hidden />
                <p className="industry-card-title">{item.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
