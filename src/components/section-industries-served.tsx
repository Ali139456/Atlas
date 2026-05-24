"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { homeAnchors, industriesServed } from "@/lib/site-content";

function useVisibleCount() {
  const [count, setCount] = useState(4);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 48rem)");
    const update = () => setCount(mq.matches ? 4 : 2);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return count;
}

export function IndustriesServedSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);
  const visibleCount = useVisibleCount();
  const items = industriesServed.items;
  const loopItems = useMemo(
    () => [...items, ...items.slice(0, visibleCount)],
    [items, visibleCount],
  );

  const applyTransform = useCallback(
    (index: number, withTransition: boolean) => {
      const track = trackRef.current;
      const slide = track?.firstElementChild as HTMLElement | undefined;
      if (!track || !slide) return;

      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 16;
      const step = slide.offsetWidth + gap;

      track.style.transition = withTransition
        ? "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
        : "none";
      track.style.transform = `translateX(-${index * step}px)`;
    },
    [],
  );

  useEffect(() => {
    setActive(0);
  }, [visibleCount]);

  useEffect(() => {
    applyTransform(active, enableTransition);
  }, [active, enableTransition, applyTransform, loopItems.length, visibleCount]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(() => {
      applyTransform(active, false);
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [active, applyTransform]);

  useEffect(() => {
    if (active !== items.length) return;

    const resetTimer = window.setTimeout(() => {
      setEnableTransition(false);
      setActive(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setEnableTransition(true));
      });
    }, 460);

    return () => window.clearTimeout(resetTimer);
  }, [active, items.length]);

  const goNext = useCallback(() => {
    setEnableTransition(true);
    setActive((current) => (current >= items.length - 1 ? items.length : current + 1));
  }, [items.length]);

  const goPrev = useCallback(() => {
    if (active === 0) {
      setEnableTransition(false);
      setActive(items.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
          setActive(items.length - 1);
        });
      });
      return;
    }

    setEnableTransition(true);
    setActive((current) => current - 1);
  }, [active, items.length]);

  return (
    <section
      id="industries"
      className="industries-section relative section-pad overflow-hidden"
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
        </div>

        <div className="industries-carousel section-body">
          <div className="industries-arrows">
            <button
              type="button"
              className="industries-arrow"
              onClick={goPrev}
              aria-label="Previous industry"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="industries-arrow"
              onClick={goNext}
              aria-label="Next industry"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div
            ref={viewportRef}
            className="industries-viewport"
            aria-live="polite"
            style={{ ["--visible-count" as string]: visibleCount }}
          >
            <div ref={trackRef} className="industries-track">
              {loopItems.map((item, index) => (
                <Link
                  key={`${item.title}-${index}`}
                  href={homeAnchors.contact}
                  className="industry-card group"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 767px) 45vw, 240px"
                    className="industry-card-img object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="industry-card-overlay" aria-hidden />
                  <p className="industry-card-title">{item.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
