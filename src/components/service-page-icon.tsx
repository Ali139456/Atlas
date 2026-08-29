import {
  BarChart3,
  BookOpen,
  Building2,
  ClipboardList,
  Headphones,
  Layers,
  Monitor,
  Shield,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { CoreServiceIcon } from "@/lib/core-services";

const icons: Record<CoreServiceIcon, LucideIcon> = {
  bookkeeping: BookOpen,
  payable: ClipboardList,
  reporting: BarChart3,
  specialized: Building2,
  payroll: Wallet,
  "customer-service": Headphones,
  "it-support": Monitor,
  cybersecurity: Shield,
  bpo: Layers,
  automation: Sparkles,
};

export function ServicePageIcon({
  name,
  className = "h-5 w-5",
}: {
  name: CoreServiceIcon;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} strokeWidth={1.65} aria-hidden />;
}
