import {
  BadgeDollarSign,
  Clock3,
  Network,
  Star,
  Target,
  type LucideIcon,
} from "lucide-react";

type IconKey = "expert" | "process" | "focus" | "network" | "savings";

const icons: Record<IconKey, LucideIcon> = {
  savings: BadgeDollarSign,
  expert: Star,
  process: Clock3,
  focus: Target,
  network: Network,
};

export function FeatureIcon({ name, className = "h-6 w-6" }: { name: IconKey; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}
