import { BookOpen, ClipboardList, Landmark, type LucideIcon } from "lucide-react";
import type { CoreServiceIcon } from "@/lib/core-services";

const icons: Record<CoreServiceIcon, LucideIcon> = {
  payable: ClipboardList,
  reconciliation: Landmark,
  ledger: BookOpen,
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
