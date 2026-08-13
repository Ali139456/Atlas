export function WhyUsVisual() {
  return (
    <div className="why-us__visual" aria-hidden>
      <div className="why-us__visual-glow" />
      <div className="why-us__visual-orbit" />
      <div className="why-us__visual-chart">
        <span className="why-us__visual-bar why-us__visual-bar--1" />
        <span className="why-us__visual-bar why-us__visual-bar--2" />
        <span className="why-us__visual-bar why-us__visual-bar--3" />
        <span className="why-us__visual-bar why-us__visual-bar--4" />
        <svg className="why-us__visual-arrow" viewBox="0 0 120 80" fill="none">
          <path
            d="M12 58C28 52 42 38 58 30C74 22 88 18 102 12"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M92 8L106 14L98 28"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
