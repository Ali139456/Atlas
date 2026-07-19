import { Fragment } from "react";

type TitlePart = {
  text: string;
  accent?: boolean;
};

type HeroTitleProps = {
  title: string;
  lines: readonly (readonly TitlePart[])[];
};

/** Lightweight server title — no per-character DOM / animation cost. */
export function HeroTitle({ title, lines }: HeroTitleProps) {
  return (
    <h1 className="hero-title display-xl text-white" aria-label={title}>
      <span aria-hidden="true">
        {lines.map((lineParts, lineIndex) => (
          <Fragment key={lineIndex}>
            {lineIndex > 0 ? <br /> : null}
            <span className="hero-headline-line">
              {lineParts.map((part, partIndex) => (
                <span
                  key={`${lineIndex}-${partIndex}-${part.text}`}
                  className={`hero-word${part.accent ? " hero-accent-word" : ""}`}
                >
                  {part.text}
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </h1>
  );
}
