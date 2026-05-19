type IconKey =
  | "book"
  | "chart"
  | "dashboard"
  | "folder"
  | "tax"
  | "advisory"
  | "payable"
  | "receivable"
  | "payroll"
  | "reconcile";

export function ServiceIcon({
  name,
  className = "h-6 w-6",
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
    case "payable":
      return (
        <svg {...props}>
          <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z" />
          <path d="M14 3v6h6M8 13h8M8 17h5" />
        </svg>
      );
    case "receivable":
      return (
        <svg {...props}>
          <path d="M12 3v18M7 8l5-5 5 5M7 16l5 5 5-5" />
        </svg>
      );
    case "payroll":
      return (
        <svg {...props}>
          <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3z" />
          <path d="M8 13c-2.67 0-8 1.34-8 4v2h8M16 13c-.67 0-1.4.05-2.17.15C18.6 14.34 23 15.68 23 18v2h-7" />
        </svg>
      );
    case "reconcile":
      return (
        <svg {...props}>
          <path d="M4 7h16M4 12h10M4 17h6" />
          <path d="M18 12l2 2 4-4" />
        </svg>
      );
    case "book":
      return (
        <svg {...props}>
          <path d="M6 4h10a2 2 0 012 2v14l-7-3-7 3V6a2 2 0 012-2z" />
          <path d="M8 8h8M8 12h6" />
        </svg>
      );
    case "chart":
      return (
        <svg {...props}>
          <path d="M4 20V4M8 20v-8M12 20V8M16 20v-4M20 20V4" />
        </svg>
      );
    case "dashboard":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="8" height="8" rx="1" />
          <rect x="13" y="3" width="8" height="5" rx="1" />
          <rect x="13" y="10" width="8" height="11" rx="1" />
          <rect x="3" y="13" width="8" height="8" rx="1" />
        </svg>
      );
    case "folder":
      return (
        <svg {...props}>
          <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
        </svg>
      );
    case "tax":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      );
    case "advisory":
      return (
        <svg {...props}>
          <path d="M8 12h8M12 8v8" />
          <path d="M12 3a9 9 0 109 9" />
        </svg>
      );
    default:
      return null;
  }
}
