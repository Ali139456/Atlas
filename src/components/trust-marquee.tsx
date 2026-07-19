import { trustMarquee } from "@/lib/site-content";

export function TrustMarquee() {
  const items = [...trustMarquee, ...trustMarquee];

  return (
    <section className="trust-marquee" aria-label="Service capabilities">
      <div className="trust-marquee-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="trust-marquee-item">
            <span className="trust-marquee-dot" aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
