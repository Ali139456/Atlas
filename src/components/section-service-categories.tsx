"use client";

import Link from "next/link";
import { useState } from "react";
import { ServiceCategoryIcon } from "@/components/service-category-icon";
import { serviceCategories, servicesOverview } from "@/lib/service-categories";
import "./section-service-categories.css";

export function ServiceCategoriesSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="svc-acc relative section-pad overflow-hidden">
      <div className="blob w-[500px] h-[400px] left-0 bottom-0 bg-cyan-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="svc-acc__layout">
          <div
            className="svc-acc__panels"
            role="tablist"
            aria-label="Service categories"
          >
            {serviceCategories.map((category, index) => {
              const isActive = active === index;
              return (
                <div
                  key={category.slug}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isActive}
                  aria-expanded={isActive}
                  className={`svc-acc__panel${isActive ? " is-active" : ""}`}
                  onClick={() => setActive(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(index);
                    }
                  }}
                >
                  <span className="svc-acc__rail" aria-hidden>
                    {category.shortTitle}
                  </span>

                  <div className="svc-acc__body">
                    <span className="svc-acc__icon">
                      <ServiceCategoryIcon name={category.icon} className="h-9 w-9" />
                    </span>
                    <h3 className="svc-acc__title">{category.title}</h3>
                    <p className="svc-acc__desc">{category.summary}</p>
                    <Link
                      href={`/services/${category.slug}`}
                      className="svc-acc__more"
                      tabIndex={isActive ? 0 : -1}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="svc-acc__copy">
            <p className="svc-acc__eyebrow">{servicesOverview.eyebrow}</p>
            <h2 className="svc-acc__heading display-lg">
              {servicesOverview.title}
            </h2>
            <p className="svc-acc__lead">{servicesOverview.description}</p>
            <Link
              href={`/services/${serviceCategories[0].slug}`}
              className="btn-neon svc-acc__cta"
            >
              All Services
              <svg
                className="svc-acc__cta-arrow"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 12L12 4M12 4H6.5M12 4V9.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
