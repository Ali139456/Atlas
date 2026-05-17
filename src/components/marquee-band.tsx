import { marqueeItems } from "@/lib/site-content";

function Track({ reverse = false }: { reverse?: boolean }) {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div
      className={`marquee-track ${reverse ? "marquee-track-reverse" : ""}`}
      aria-hidden
    >
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="marquee-item">
          <span>◆</span>
          {item}
        </span>
      ))}
    </div>
  );
}

export function MarqueeBand() {
  return (
    <div className="marquee-band" aria-label="Highlights">
      <Track />
    </div>
  );
}
