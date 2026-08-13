import {
  BadgeDollarSign,
  Cpu,
  Headset,
  Target,
  UserCircle,
  Users,
  type LucideIcon,
} from "lucide-react";

const icons = [Cpu, BadgeDollarSign, UserCircle, Headset, Users] as const;

export function WhyUsPointIcon({ index, className = "h-5 w-5" }: { index: number; className?: string }) {
  const Icon: LucideIcon = icons[index] ?? Cpu;
  return <Icon className={className} strokeWidth={1.65} aria-hidden />;
}

export function WhyUsMissionIcon({ className = "h-5 w-5" }: { className?: string }) {
  return <Target className={className} strokeWidth={1.65} aria-hidden />;
}
