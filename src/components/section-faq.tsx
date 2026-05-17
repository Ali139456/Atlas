"use client";

import { useState } from "react";
import { faqs } from "@/lib/site-content";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative bg-black section-pad overflow-hidden">
      <div className="blob w-[450px] h-[350px] left-1/2 -translate-x-1/2 bottom-0 bg-cyan-500/8" aria-hidden />
      <div className="site-container relative z-10">
        <div className="section-intro-center">
          <p className="eyebrow-pill mx-auto">Query section</p>
          <h2 className="display-lg section-title text-white">
            Commonly asked <span className="text-gradient-neon">questions</span>
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            Straight answers about how we work, what you get, and how fast we deliver.
          </p>
        </div>

        <ul className="faq-list section-body">
          {faqs.map((item, i) => (
            <li key={item.q} className="faq-item" data-open={open === i}>
              <button
                type="button"
                className="faq-trigger"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.q}
                <span className="faq-icon" aria-hidden>
                  +
                </span>
              </button>
              {open === i ? <p className="faq-body">{item.a}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
