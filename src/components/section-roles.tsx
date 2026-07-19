import Link from "next/link";
import { popularRoles, siteCta } from "@/lib/site-content";

export function RolesSection() {
  return (
    <section id="roles" className="roles-section relative section-pad overflow-hidden">
      <div className="blob w-[480px] h-[360px] left-0 top-1/4 bg-purple-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="section-intro">
          <p className="eyebrow-pill">{popularRoles.eyebrow}</p>
          <h2 className="display-lg section-title text-white">
            {popularRoles.title}{" "}
            <span className="text-gradient-neon">{popularRoles.titleAccent}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">{popularRoles.description}</p>
        </div>

        <ul className="roles-grid section-body">
          {popularRoles.items.map((role, index) => (
            <li key={role.title}>
              <article className="role-card glass-strong glass-hover">
                <span className="role-card-num text-gradient-neon">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="role-card-title">{role.title}</h3>
                <p className="role-card-desc">{role.description}</p>
                <div className="role-card-actions">
                  <Link href={siteCta.href} className="role-card-cta">
                    {siteCta.label}
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
