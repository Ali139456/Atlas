import { Star } from "lucide-react";
import { testimonials } from "@/lib/site-content";
import "./section-testimonials.css";

function Stars({ count }: { count: number }) {
  return (
    <div className="reviews__stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4${i < count ? " is-on fill-current" : ""}`}
          aria-hidden
        />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TestimonialsSection() {
  const featured = testimonials.items.find((item) => item.featured) ?? testimonials.items[0];
  const rest = testimonials.items.filter((item) => item !== featured);

  return (
    <section id="reviews" className="reviews relative section-pad overflow-hidden">
      <div className="blob w-[480px] h-[340px] right-0 top-0 blob--accent" aria-hidden />
      <div className="reviews__glow" aria-hidden />

      <div className="site-container relative z-10">
        <div className="reviews__intro">
          <p className="eyebrow-pill">{testimonials.eyebrow}</p>
          <h2 className="display-lg reviews__title text-heading">
            {testimonials.title}{" "}
            <span className="text-gradient-neon">{testimonials.titleAccent}</span>
          </h2>
          <p className="reviews__lead">{testimonials.description}</p>
        </div>

        <div className="reviews__layout">
          <article className="reviews__featured">
            <span className="reviews__quote-mark" aria-hidden>
              “
            </span>
            <Stars count={featured.rating} />
            <p className="reviews__featured-quote">{featured.quote}</p>
            <div className="reviews__person">
              <span className="reviews__avatar" aria-hidden>
                {initials(featured.name)}
              </span>
              <div>
                <p className="reviews__name">{featured.name}</p>
                <p className="reviews__meta">
                  {featured.role} · {featured.company}
                </p>
              </div>
            </div>
          </article>

          <div className="reviews__stack">
            {rest.map((item) => (
              <article key={item.name} className="reviews__card">
                <Stars count={item.rating} />
                <p className="reviews__card-quote">{item.quote}</p>
                <div className="reviews__person">
                  <span className="reviews__avatar reviews__avatar--sm" aria-hidden>
                    {initials(item.name)}
                  </span>
                  <div>
                    <p className="reviews__name">{item.name}</p>
                    <p className="reviews__meta">
                      {item.role} · {item.company}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
