type IconKey = "expert" | "process" | "focus" | "network" | "savings";

export function FeatureIcon({ name, className = "h-6 w-6" }: { name: IconKey; className?: string }) {
  const p = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "savings":
      return (
        <svg {...p}>
          <path d="M12 3v18M7.5 8.5c0-1.7 2-3 4.5-3s4.5 1.3 4.5 3-2 3-4.5 3-4.5 1.3-4.5 3 2 3 4.5 3 4.5-1.3 4.5-3" />
        </svg>
      );
    case "expert":
      return (
        <svg {...p}>
          <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L6 20.9l2.3-7-6-4.6h7.6L12 2z" />
        </svg>
      );
    case "process":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
    case "focus":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
        </svg>
      );
    case "network":
      return (
        <svg {...p}>
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="M8 7l4 9M16 7l-4 9M8 6h8" />
        </svg>
      );
    default:
      return null;
  }
}
