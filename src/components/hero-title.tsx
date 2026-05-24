"use client";

import { Fragment } from "react";

type TitlePart = {
  text: string;
  accent?: boolean;
};

type HeroAnimatedTitleProps = {
  title: string;
  lines: readonly (readonly TitlePart[])[];
};

export function HeroAnimatedTitle({ title, lines }: HeroAnimatedTitleProps) {
  let charIndex = 0;

  return (
    <h1 className="hero-title display-xl text-white" aria-label={title}>
      <span aria-hidden="true">
        {lines.map((lineParts, lineIndex) => (
          <Fragment key={lineIndex}>
            {lineIndex > 0 ? <br /> : null}
            <span className="hero-headline-line">
              {lineParts.map((part, partIndex) => {
                const chars = part.text.split("");

                return (
                  <span
                    key={`${lineIndex}-${partIndex}-${part.text}`}
                    className={`hero-word${part.accent ? " hero-accent-word" : ""}`}
                  >
                    {chars.map((char, i) => {
                      const index = charIndex++;
                      return (
                        <span
                          key={`${lineIndex}-${partIndex}-${i}`}
                          className="hero-char"
                          style={{ animationDelay: `${index * 0.045}s` }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </span>
          </Fragment>
        ))}
      </span>
    </h1>
  );
}
