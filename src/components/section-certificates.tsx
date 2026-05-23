"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { certificatesSection } from "@/lib/site-content";

const AUTO_MS = 6000;

export function CertificatesSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const items = certificatesSection.items;

  const scrollToIndex = useCallback(
    (index: number, smooth = true) => {
      const track = trackRef.current;
      if (!track) return;

      const total = items.length;
      const next = ((index % total) + total) % total;
      const slide = track.children[next] as HTMLElement | undefined;
      if (!slide) return;

      const target = slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
      const maxScroll = track.scrollWidth - track.clientWidth;

      track.scrollTo({
        left: Math.min(maxScroll, Math.max(0, target)),
        behavior: smooth ? "smooth" : "auto",
      });
      setActive(next);
    },
    [items.length],
  );

  const goPrev = () => scrollToIndex(active - 1);
  const goNext = () => scrollToIndex(active + 1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const slides = Array.from(track.children) as HTMLElement[];
      if (slides.length === 0) return;

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
    onScroll();
    return () => track.removeEventListener("scroll", onScroll);
  }, [items.length]);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || paused || items.length <= 1) return;

    const id = window.setTimeout(() => {
      scrollToIndex(active + 1);
    }, AUTO_MS);

    return () => window.clearTimeout(id);
  }, [active, paused, items.length, scrollToIndex]);

  return (
    <section className="certificates-section">
      <div className="site-container certificates-inner">
        <h2 className="certificates-title">{certificatesSection.title}</h2>
        <div className="certificates-divider" aria-hidden />

        <div
          className="certificates-carousel-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            className="certificates-arrow"
            onClick={goPrev}
            aria-label="Previous certificate"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div ref={trackRef} className="certificates-track">
            {items.map((item) => (
              <div key={item.name} className="certificate-logo">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={160}
                  height={80}
                  className="certificate-logo-img"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="certificates-arrow"
            onClick={goNext}
            aria-label="Next certificate"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
