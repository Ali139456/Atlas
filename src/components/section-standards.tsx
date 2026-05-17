import { standards } from "@/lib/site-content";
import { SectionShell } from "@/components/section-shell";

export function StandardsSection() {
  return (
    <SectionShell id="standards" glow="right">
      <div className="section-header-left">
        <p className="section-eyebrow">{standards.eyebrow}</p>
        <h2 className="section-heading mt-6 text-white">
          {standards.title}{" "}
          <span className="gradient-neon-purple">{standards.titleAccent}</span>
        </h2>
      </div>

      <ol className="standards-grid mt-12 sm:mt-16">
        {standards.items.map((item) => (
          <li key={item.num}>
            <article className="glass-card h-full p-5 sm:p-6">
              <span className="standard-num gradient-neon">{item.num}</span>
              <h3 className="mt-4 text-lg font-semibold text-white sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:mt-3 sm:text-base">
                {item.body}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
