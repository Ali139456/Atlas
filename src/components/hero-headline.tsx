"use client";

const CHAR_DELAY = 0.045;

function AnimatedChars({
  text,
  startIndex,
  className,
}: {
  text: string;
  startIndex: number;
  className?: string;
}) {
  return (
    <>
      {[...text].map((char, i) => (
        <span
          key={`${startIndex}-${i}-${char}`}
          className={className ? `hero-char ${className}` : "hero-char"}
          style={{ animationDelay: `${(startIndex + i) * CHAR_DELAY}s` }}
          aria-hidden
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </>
  );
}

type Props = {
  title: string;
  titleAccent: string;
  titleSuffix?: string;
};

export function HeroHeadline({ title, titleAccent, titleSuffix }: Props) {
  const accentStart = title.length;
  const suffixStart = accentStart + titleAccent.length + (titleSuffix ? 1 : 0);

  return (
    <h1 className="display-xl mt-5 text-white hero-headline">
      <span className="sr-only">
        {title} {titleAccent}
        {titleSuffix ? ` ${titleSuffix}` : ""}
      </span>
      <span className="hero-headline-line" aria-hidden>
        <AnimatedChars text={title} startIndex={0} />
      </span>
      <br aria-hidden />
      <span className="hero-headline-line" aria-hidden>
        <AnimatedChars text={titleAccent} startIndex={accentStart} />
      </span>
      {titleSuffix ? (
        <>
          <br aria-hidden />
          <span className="hero-headline-line" aria-hidden>
            <AnimatedChars
              text={titleSuffix}
              startIndex={suffixStart}
              className="text-gradient-neon"
            />
          </span>
        </>
      ) : null}
    </h1>
  );
}
