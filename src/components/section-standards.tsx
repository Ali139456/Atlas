import { AnimatedStandardsList } from "@/components/animated-standards-num";
import { standards } from "@/lib/site-content";

export function StandardsSection() {
  return (
    <section id="standards" className="standards-section relative bg-mesh bg-grid section-pad overflow-hidden">
      <div
        className="blob w-[520px] h-[400px] -right-1/4 top-1/3 -translate-y-1/2 bg-cyan-500/8"
        aria-hidden
      />
      <div className="blob w-[380px] h-[320px] -left-1/4 bottom-0 bg-purple-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="standards-intro section-intro">
          <p className="eyebrow-pill">{standards.eyebrow}</p>
          <h2 className="display-lg section-title text-white">
            {standards.title}{" "}
            <span className="text-gradient-neon">{standards.titleAccent}</span>
          </h2>
          <p className="standards-lead">{standards.description}</p>
        </div>

        <AnimatedStandardsList items={standards.items} />
      </div>
    </section>
  );
}
