"use client";

import { stats } from "@/lib/site-content";
import { useCountUp } from "@/components/use-count-up";
import { useInView } from "@/components/use-in-view";

function StatBlock({
  value,
  suffix,
  label,
  animate,
}: {
  value: string;
  suffix: string;
  label: string;
  animate: boolean;
}) {
  const target = Number.parseInt(value, 10) || 0;
  const count = useCountUp(target, animate);

  return (
    <div className="glass-strong glass-hover stat-block">
      <p className="num text-gradient-neon">
        {count}
        <span className="text-2xl sm:text-3xl">{suffix}</span>
      </p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
        {label}
      </p>
    </div>
  );
}

export function AnimatedStats() {
  const { ref, inView } = useInView(0.3);

  return (
    <div ref={ref} className="stats-row section-body">
      {stats.map((s) => (
        <StatBlock
          key={s.label}
          value={s.value}
          suffix={s.suffix}
          label={s.label}
          animate={inView}
        />
      ))}
    </div>
  );
}
