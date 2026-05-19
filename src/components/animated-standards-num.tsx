"use client";

import { useCountUp } from "@/components/use-count-up";
import { useInView } from "@/components/use-in-view";

export function AnimatedStandardsList({
  items,
}: {
  items: readonly { num: string; title: string; body: string }[];
}) {
  const { ref, inView } = useInView(0.2);

  return (
    <div ref={ref}>
      <ol className="standards-points section-body">
        {items.map((item) => (
          <StandardsPoint key={item.num} item={item} animate={inView} />
        ))}
      </ol>
    </div>
  );
}

function StandardsPoint({
  item,
  animate,
}: {
  item: { num: string; title: string; body: string };
  animate: boolean;
}) {
  const target = Number.parseInt(item.num, 10) || 0;
  const count = useCountUp(target, animate, 1000);
  const display = String(count).padStart(2, "0");

  return (
    <li className="standards-point">
      <span className="standards-point-num">{display}</span>
      <div className="standards-point-content">
        <h3 className="standards-point-title">{item.title}</h3>
        <p className="standards-point-body">{item.body}</p>
      </div>
    </li>
  );
}
