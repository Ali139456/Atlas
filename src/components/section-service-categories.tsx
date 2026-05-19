import Link from "next/link";
import { serviceCategories, servicesOverview } from "@/lib/service-categories";
import { ServiceCategoryIcon } from "@/components/service-category-icon";

export function ServiceCategoriesSection() {
  return (
    <section id="services" className="relative bg-black section-pad overflow-hidden">
      <div className="blob w-[500px] h-[400px] right-0 top-0 bg-cyan-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="section-intro">
          <p className="eyebrow-pill">{servicesOverview.eyebrow}</p>
          <h2 className="display-lg section-title service-categories-heading text-white">
            {servicesOverview.title}{" "}
            <span className="text-gradient-neon">{servicesOverview.titleAccent}</span>
          </h2>
          <p className="mt-4 text-[var(--muted)]">{servicesOverview.description}</p>
        </div>

        <div className="service-categories-grid section-body">
          {serviceCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/services/${category.slug}`}
              className="service-category-card glass-strong glass-hover group"
            >
              <div className="service-category-card-icon">
                <ServiceCategoryIcon name={category.icon} className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-[var(--neon-bright)]">
                {category.shortTitle}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                {category.summary}
              </p>
              <span className="service-category-card-link btn-link mt-4">
                View sub-services →
              </span>
              <span className="service-category-card-count">
                {category.subServices.length} services
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
