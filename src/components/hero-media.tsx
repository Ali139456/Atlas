"use client";

import { useEffect, useRef, useState } from "react";

type HeroMediaProps = {
  src: string;
};

/** Loads ambient video only on desktop after idle — mobile keeps the gradient only. */
export function HeroMedia({ src }: HeroMediaProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqDesktop = window.matchMedia("(min-width: 64rem)");
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;

    const slowNetwork =
      Boolean(connection?.saveData) ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    if (mqReduce.matches || !mqDesktop.matches || slowNetwork) {
      return;
    }

    let cancelled = false;
    let idleId = 0;
    let timeoutId = 0;

    const arm = () => {
      if (cancelled) return;
      setShouldLoad(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const win = window as Window & {
          requestIdleCallback?: (
            cb: IdleRequestCallback,
            opts?: IdleRequestOptions,
          ) => number;
          cancelIdleCallback?: (id: number) => void;
        };
        if (typeof win.requestIdleCallback === "function") {
          idleId = win.requestIdleCallback(arm, { timeout: 1800 });
        } else {
          timeoutId = window.setTimeout(arm, 900);
        }
      },
      { rootMargin: "120px" },
    );

    if (wrapRef.current) observer.observe(wrapRef.current);

    return () => {
      cancelled = true;
      observer.disconnect();
      const win = window as Window & {
        cancelIdleCallback?: (id: number) => void;
      };
      if (idleId && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;
    video.play().catch(() => {
      /* Autoplay may be blocked — gradient fallback remains */
    });
  }, [shouldLoad]);

  return (
    <div ref={wrapRef} className="hero-media" aria-hidden>
      {shouldLoad ? (
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
      <div className="hero-media-fallback" />
      <div className="hero-media-overlay" />
    </div>
  );
}
