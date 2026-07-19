import { Fragment } from "react";

type TitlePart = {
  text: string;
  accent?: boolean;
};

type HeroTitleProps = {
  title: string;
  lines: readonly (readonly TitlePart[])[];
};

type WordToken = {
  text: string;
  accent?: boolean;
};

function toWords(lineParts: readonly TitlePart[]): WordToken[] {
  const words: WordToken[] = [];

  for (const part of lineParts) {
    const chunks = part.text.split(/(\s+)/);
    for (const chunk of chunks) {
      if (!chunk || /^\s+$/.test(chunk)) continue;
      words.push({ text: chunk, accent: part.accent });
    }
  }

  return words;
}

/** Alphabet-by-alphabet reveal, words kept as nowrap units so spacing stays correct. */
export function HeroTitle({ title, lines }: HeroTitleProps) {
  let charIndex = 0;

  return (
    <h1 className="hero-title display-xl text-white" aria-label={title}>
      <span aria-hidden="true">
        {lines.map((lineParts, lineIndex) => {
          const words = toWords(lineParts);

          return (
            <Fragment key={lineIndex}>
              {lineIndex > 0 ? <br className="hero-title-break" /> : null}
              <span className="hero-headline-line">
                {words.map((word, wordIndex) => (
                  <Fragment key={`${lineIndex}-${wordIndex}-${word.text}`}>
                    {wordIndex > 0 ? " " : null}
                    <span
                      className={`hero-word${word.accent ? " hero-accent-word" : ""}`}
                    >
                      {word.text.split("").map((char, i) => {
                        const index = charIndex++;
                        return (
                          <span
                            key={`${lineIndex}-${wordIndex}-${i}`}
                            className="hero-char"
                            style={{ animationDelay: `${index * 0.04}s` }}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </span>
                  </Fragment>
                ))}
              </span>
            </Fragment>
          );
        })}
      </span>
    </h1>
  );
}
