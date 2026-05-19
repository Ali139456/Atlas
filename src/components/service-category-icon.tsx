type IconKey = "owners" | "property" | "asset" | "investors";

export function ServiceCategoryIcon({
  name,
  className = "h-8 w-8",
}: {
  name: IconKey;
  className?: string;
}) {
  const props = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "owners":
      return (
        <svg {...props}>
          <path d="M4 20V9l8-5 8 5v11H4z" />
          <path d="M9 20v-6h6v6M12 4v3" />
        </svg>
      );
    case "property":
      return (
        <svg {...props}>
          <path d="M12 3l8 5v13H4V8l8-5z" />
          <circle cx="12" cy="11" r="1.5" fill="currentColor" stroke="none" />
          <path d="M8 20v-4h8v4" />
        </svg>
      );
    case "asset":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="8" height="8" rx="1" />
          <rect x="13" y="3" width="8" height="5" rx="1" />
          <rect x="13" y="10" width="8" height="11" rx="1" />
          <rect x="3" y="13" width="8" height="8" rx="1" />
        </svg>
      );
    case "investors":
      return (
        <svg {...props}>
          <path d="M4 18V6M8 18V10M12 18V4M16 18v-6M20 18V8" />
        </svg>
      );
    default:
      return null;
  }
}
