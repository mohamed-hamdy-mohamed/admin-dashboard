import { Stats } from "@/types/stats";
import { formatNumber } from "@/util/formatNumber";
import { formatPrice } from "@/util/formatPrice";
import { ShoppingBag, DollarSign, Star, UtensilsCrossed } from "lucide-react";

export const dashboardStats: Stats[] = [
  {
    title: "Total Orders",
    value: formatNumber(1254),
    description: "+12.4% from last month",
    icon: ShoppingBag,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Revenue",
    value: formatPrice(84250),
    description: "+18.2% from last month",
    icon: DollarSign,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Menu Items",
    value: formatNumber(128),
    description: "Across all categories",
    icon: UtensilsCrossed,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "Average Rating",
    value: "4.8",
    description: "Based on customer reviews",
    icon: Star,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
];
