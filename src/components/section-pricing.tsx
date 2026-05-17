"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { paymentMethods, pricingPerks, pricingPlans } from "@/lib/site-content";

const PRICING_FEATURE_SLOTS = 6;

function PricingCard({
  plan,
}: {
  plan: (typeof pricingPlans)[number];
}) {
  const featureSlots = Array.from(
    { length: PRICING_FEATURE_SLOTS },
    (_, i) => plan.features[i] ?? null
  );

  return (
    <article
      className={`glass-strong pricing-card ${
        plan.highlighted ? "featured" : ""
      }`}
    >
      <div className="pricing-card-top">
        {plan.highlighted ? (
          <span className="pricing-card-badge rounded-full border border-[var(--border-strong)] bg-[rgba(0,240,255,0.12)] px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-[var(--neon)]">
            Most popular
          </span>
        ) : null}
      </div>

      <div className="pricing-card-head">
        <h3 className="text-base font-semibold text-white sm:text-lg">{plan.name}</h3>
        <p className="mt-0.5 text-xs text-[var(--muted-dim)]">{plan.billing}</p>
        <p className="pricing-card-price mt-2 display-lg text-gradient-neon">
          {plan.price}
          {plan.period ? (
            <span className="text-sm font-normal text-[var(--muted)] sm:text-base">{plan.period}</span>
          ) : null}
        </p>
        <p className="pricing-card-desc mt-1.5 text-xs text-[var(--muted)] sm:text-sm">
          {plan.description}
        </p>
      </div>

      <ul className="pricing-card-features">
        {featureSlots.map((feature, i) => (
          <li
            key={`${plan.name}-feature-${i}`}
            className={feature ? "pricing-feature" : "pricing-feature pricing-feature--empty"}
            aria-hidden={!feature}
          >
            {feature ? (
              <>
                <span className="text-[var(--neon)]">✓</span>
                <span>{feature}</span>
              </>
            ) : null}
          </li>
        ))}
      </ul>

      <div className="pricing-card-foot">
        <Link
          href="#contact"
          className={`pricing-card-cta w-full text-center ${plan.highlighted ? "btn-neon" : "btn-outline"}`}
        >
          {plan.cta}
        </Link>
      </div>
    </article>
  );
}

export function PricingSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(() => {
    const i = pricingPlans.findIndex((p) => p.highlighted);
    return i >= 0 ? i : 0;
  });

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(index, pricingPlans.length - 1));
    const slide = track.children[next] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActive(next);
  }, []);

  const goPrev = () => scrollToIndex(active - 1);
  const goNext = () => scrollToIndex(active + 1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const slides = Array.from(track.children) as HTMLElement[];
      if (!slides.length) return;
      const left = track.scrollLeft;
      let closest = 0;
      let minDist = Infinity;
      slides.forEach((slide, i) => {
        const dist = Math.abs(slide.offsetLeft - track.offsetLeft - left);
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

  useEffect(() => {
    const highlighted = pricingPlans.findIndex((p) => p.highlighted);
    if (highlighted >= 0) {
      requestAnimationFrame(() => scrollToIndex(highlighted));
    }
  }, [scrollToIndex]);

  return (
    <section id="pricing" className="relative bg-black section-pad overflow-hidden">
      <div className="blob w-[550px] h-[400px] right-0 top-1/2 -translate-y-1/2 bg-cyan-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="section-intro-center">
          <p className="eyebrow-pill mx-auto">Select your plan</p>
          <h2 className="display-lg section-title text-white">
            Flexible pricing{" "}
            <span className="text-gradient-neon">that fits you</span>
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            Flat-rate monthly packages — transparent, scalable, no surprise invoices.
          </p>
        </div>

        <div className="pricing-carousel section-body">
          <div className="pricing-carousel-shell">
            <button
              type="button"
              className="pricing-arrow pricing-arrow--prev"
              onClick={goPrev}
              disabled={active === 0}
              aria-label="Previous plan"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="pricing-track-wrap">
              <div ref={trackRef} className="pricing-track">
                {pricingPlans.map((plan) => (
                  <div key={plan.name} className="pricing-slide">
                    <PricingCard plan={plan} />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="pricing-arrow pricing-arrow--next"
              onClick={goNext}
              disabled={active === pricingPlans.length - 1}
              aria-label="Next plan"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="pricing-dots" role="tablist" aria-label="Pricing plans">
            {pricingPlans.map((plan, i) => (
              <button
                key={plan.name}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`View ${plan.name} plan`}
                className={`pricing-dot ${active === i ? "is-active" : ""}`}
                onClick={() => scrollToIndex(i)}
              />
            ))}
          </div>
        </div>

        <ul className="pricing-perks">
          {pricingPerks.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>

        <div className="glass-strong section-body p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-white">Payment options</h3>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {paymentMethods.map((m) => (
              <div key={m.name} className="payment-tile rounded-xl border border-[var(--border)] p-4">
                <p className="font-medium text-white">{m.name}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
