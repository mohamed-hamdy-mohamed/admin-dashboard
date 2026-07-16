import { formatNumber } from "@/util/formatNumber";
import { formatPrice } from "@/util/formatPrice";
import {
  BriefcaseBusiness,
  DollarSign,
  LucideIcon,
  UserRound,
  Zap,
} from "lucide-react";

export interface DashboardStats {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
}

export const dashboardStats: DashboardStats[] = [
  {
    title: "Total Sales",
    value: formatPrice(12_845),
    icon: DollarSign,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Total Clients",
    value: formatNumber(1437),
    icon: UserRound,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    title: "Total Products",
    value: formatNumber(674),
    icon: BriefcaseBusiness,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    title: "Stock",
    value: formatNumber(12845),
    icon: Zap,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
];
