import type { LucideIcon } from "lucide-react";

export interface Stats {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}
