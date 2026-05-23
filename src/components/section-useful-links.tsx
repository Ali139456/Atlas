"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usefulLinksSection } from "@/lib/site-content";

export function UsefulLinksSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = usefulLinksSection.items;

  const scrollToIndex = useCallback(
    (index: number, smooth = true) => {
      const track = trackRef.current;
      if (!track) return;
      const next = Math.max(0, Math.min(index, items.length - 1));
      const slide = track.children[next] as HTMLElement | undefined;
      if (slide) {
        track.scrollTo({
          left: slide.offsetLeft,
          behavior: smooth ? "smooth" : "auto",
        });
      }
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
    <section id="resources" className="useful-links-section relative section-pad overflow-hidden">
      <div className="site-container relative z-10">
        <div className="useful-links-header">
          <h2 className="useful-links-title">{usefulLinksSection.title}</h2>
          <div className="useful-links-arrows">
            <button
              type="button"
              className="useful-links-arrow"
              onClick={goPrev}
              disabled={!canPrev}
              aria-label="Previous useful link"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="useful-links-arrow"
              onClick={goNext}
              disabled={!canNext}
              aria-label="Next useful link"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="useful-links-carousel">
          <div ref={trackRef} className="useful-links-track">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="useful-link-card group"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 85vw, 280px"
                  className="useful-link-img object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="useful-link-overlay" aria-hidden />
                <p className="useful-link-label">{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
