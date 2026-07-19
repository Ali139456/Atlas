import { proofStrip } from "@/lib/site-content";

export function ProofStrip() {
  return (
    <section className="proof-strip" aria-label="Company highlights">
      <div className="site-container">
        <p className="proof-strip-eyebrow">{proofStrip.eyebrow}</p>
        <ul className="proof-strip-grid">
          {proofStrip.items.map((item) => (
            <li key={item.label} className="proof-strip-item">
              <p className="proof-strip-value">{item.value}</p>
              <p className="proof-strip-label">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
