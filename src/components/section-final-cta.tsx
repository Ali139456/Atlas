import Link from "next/link";
import { finalCta, siteCta } from "@/lib/site-content";
import "./section-final-cta.css";

export function FinalCtaSection() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="final-cta__grid" aria-hidden />
      <div className="final-cta__arc final-cta__arc--left" aria-hidden />
      <div className="final-cta__arc final-cta__arc--right" aria-hidden />

      <div className="site-container final-cta__inner">
        <h2 id="final-cta-title" className="final-cta__title">
          {finalCta.title}
        </h2>
        <p className="final-cta__text">{finalCta.description}</p>
        <Link href={siteCta.href} className="final-cta__btn">
          {finalCta.buttonLabel || siteCta.label}
        </Link>
      </div>
    </section>
  );
}
