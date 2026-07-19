import Image from "next/image";
import Link from "next/link";
import { homeAnchors, industriesServed } from "@/lib/site-content";
import "./section-industries.css";

export function IndustriesServedSection() {
  return (
    <section
      id="industries"
      className="industries-section relative section-pad overflow-hidden"
    >
      <div className="blob w-[480px] h-[360px] right-0 bottom-0 bg-cyan-500/10" aria-hidden />
      <div className="blob w-[360px] h-[280px] left-0 top-1/3 bg-cyan-500/5" aria-hidden />

      <div className="site-container relative z-10">
        <div className="industries-header">
          <p className="eyebrow-pill">{industriesServed.eyebrow}</p>
          <h2 className="display-lg industries-title text-white">
            {industriesServed.title}{" "}
            <span className="text-gradient-neon">{industriesServed.titleAccent}</span>
          </h2>
          <p className="industries-lead">{industriesServed.description}</p>
        </div>

        <div className="industries-grid">
          {industriesServed.items.map((item, index) => (
            <Link
              key={item.title}
              href={homeAnchors.contact}
              className="industry-card group"
            >
              <span className="industry-card-frame" aria-hidden />
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 28vw"
                className="industry-card-img object-cover"
                quality={60}
                loading="lazy"
              />
              <div className="industry-card-overlay" aria-hidden />
              <div className="industry-card-content">
                <span className="industry-card-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="industry-card-title">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
