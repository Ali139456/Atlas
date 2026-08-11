import {
  BarChart3,
  Building2,
  Home,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

type IconKey = "owners" | "property" | "asset" | "investors";

const icons: Record<IconKey, LucideIcon> = {
  owners: Home,
  property: Building2,
  asset: LayoutGrid,
  investors: BarChart3,
};

export function ServiceCategoryIcon({
  name,
  className = "h-8 w-8",
}: {
  name: IconKey;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}
