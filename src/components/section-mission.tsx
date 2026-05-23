import { AnimatedStats } from "@/components/animated-stats";
import { whyChooseUs } from "@/lib/site-content";

export function WhyChooseUsSection() {
  return (
    <section id="why-us" className="relative section-pad overflow-hidden">
      <div className="blob w-[500px] h-[400px] -left-1/4 top-1/2 bg-cyan-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="section-intro">
          <p className="eyebrow-pill">{whyChooseUs.eyebrow}</p>
          <h2 className="display-lg section-title text-white">
            {whyChooseUs.title}{" "}
            <span className="text-gradient-neon">{whyChooseUs.titleAccent}</span>
          </h2>
        </div>
        <AnimatedStats />
      </div>
    </section>
  );
}
