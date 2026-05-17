import Link from "next/link";
import { process } from "@/lib/site-content";

export function ProcessSection() {
  return (
    <section id="process" className="relative bg-mesh section-pad overflow-hidden">
      <div className="blob w-[400px] h-[300px] left-0 bottom-0 bg-purple-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="process-intro flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="section-intro">
            <p className="eyebrow-pill">{process.eyebrow}</p>
            <h2 className="display-lg section-title text-white">
              {process.title}{" "}
              <span className="text-gradient-purple">{process.titleAccent}</span>
            </h2>
            <p className="mt-4 text-[var(--muted)]">{process.description}</p>
          </div>
          <Link href="#contact" className="btn-outline shrink-0">
            Work with us
          </Link>
        </div>

        <ol className="process-row section-body">
          {process.steps.map((step) => (
            <li key={step.title}>
              <article className="glass-strong glass-hover process-card h-full">
                <span className="text-sm font-bold tracking-widest text-[var(--neon)]">
                  {step.num}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
                <Link href="#contact" className="btn-link mt-6">
                  Click here →
                </Link>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
