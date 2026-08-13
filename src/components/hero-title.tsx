import { Fragment } from "react";

type TitlePart = {
  text: string;
  accent?: boolean;
};

type HeroTitleProps = {
  title: string;
  lines: readonly (readonly TitlePart[])[];
};

export function HeroTitle({ title, lines }: HeroTitleProps) {
  return (
    <h1 className="hero-title display-xl text-heading" aria-label={title}>
      {lines.map((lineParts, lineIndex) => (
        <Fragment key={lineIndex}>
          {lineIndex > 0 ? <br className="hero-title-break" /> : null}
          <span className="hero-headline-line">
            {lineParts.map((part, partIndex) => (
              <Fragment key={partIndex}>
                {partIndex > 0 ? " " : null}
                <span className={part.accent ? "hero-accent-word" : undefined}>{part.text}</span>
              </Fragment>
            ))}
          </span>
        </Fragment>
      ))}
    </h1>
  );
}
