import {
  BarChart3,
  CircleDollarSign,
  ClipboardList,
  Cpu,
  Users,
  type LucideIcon,
} from "lucide-react";

type IconKey = "people" | "process" | "technology" | "efficiency" | "savings";

const icons: Record<IconKey, LucideIcon> = {
  people: Users,
  process: ClipboardList,
  technology: Cpu,
  efficiency: BarChart3,
  savings: CircleDollarSign,
};

export function ValuePropIcon({
  name,
  className = "h-6 w-6",
}: {
  name: IconKey;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} strokeWidth={1.65} aria-hidden />;
}
