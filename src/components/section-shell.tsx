import type { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  variant?: "default" | "mesh" | "grid";
  glow?: "left" | "right" | "center" | "none";
};

const variants: Record<NonNullable<Props["variant"]>, string> = {
  default: "bg-black",
  mesh: "bg-black bg-mesh",
  grid: "bg-black bg-mesh bg-grid-fine",
};

export function SectionShell({
  id,
  children,
  className = "",
  innerClassName = "",
  variant = "mesh",
  glow = "center",
}: Props) {
  const glowPosition =
    glow === "left"
      ? "-left-1/4 top-1/4"
      : glow === "right"
        ? "-right-1/4 top-1/3"
        : "left-1/2 top-0 -translate-x-1/2";

  return (
    <section
      id={id}
      className={`relative overflow-x-clip ${variants[variant]} ${className}`}
    >
      {glow !== "none" ? (
        <>
          <div
            className={`section-glow section-glow-cyan animate-pulse-glow ${glowPosition}`}
            aria-hidden
          />
          {glow === "center" ? (
            <div
              className="section-glow section-glow-purple -right-1/4 bottom-0"
              aria-hidden
            />
          ) : null}
        </>
      ) : null}
      <div
        className={`site-container section-pad-y relative z-10 ${innerClassName}`.trim()}
      >
        {children}
      </div>
    </section>
  );
}
