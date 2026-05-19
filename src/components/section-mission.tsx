import Image from "next/image";
import { AnimatedStats } from "@/components/animated-stats";
import { mission } from "@/lib/site-content";

export function MissionSection() {
  return (
    <section id="mission" className="relative bg-black section-pad overflow-hidden">
      <div className="blob w-[500px] h-[400px] -left-1/4 top-1/2 bg-cyan-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="mission-layout">
          <div>
            <p className="eyebrow-pill">{mission.eyebrow}</p>
            <p className="mission-text mt-6">
              {mission.lead}{" "}
              <span className="mission-highlight">{mission.highlight1}</span> {mission.mid}{" "}
              <span className="mission-highlight">{mission.highlight2}</span> {mission.end}
            </p>
          </div>
          <div className="photo-frame mission-photo">
            <Image
              src={mission.image}
              alt={mission.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>

        <AnimatedStats />
      </div>
    </section>
  );
}
