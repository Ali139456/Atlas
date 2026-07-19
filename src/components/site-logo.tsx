import Image from "next/image";
import { site } from "@/lib/site-content";

type SiteLogoProps = {
  className?: string;
  /** Above-the-fold LCP candidate (header). */
  priority?: boolean;
};

const LOGO_WIDTH = 480;
const LOGO_HEIGHT = 529;

export function SiteLogo({ className = "nav-logo", priority = false }: SiteLogoProps) {
  return (
    <Image
      src={site.logo}
      alt={site.brand}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      className={className}
      sizes="(max-width: 47.9375rem) 200px, 360px"
      quality={90}
      {...(priority
        ? { loading: "eager" as const, fetchPriority: "high" as const }
        : { loading: "lazy" as const })}
    />
  );
}
