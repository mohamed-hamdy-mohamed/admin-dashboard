"use client";

import { useMemo } from "react";
import { DollarSign, ShoppingBag, Star, UtensilsCrossed } from "lucide-react";
import { useTranslation } from "@/providers/LanguageProvider";
import { Stats } from "@/types/stats";
import { formatDecimal, formatNumber } from "@/util/formatNumber";
import { formatPrice } from "@/util/formatPrice";
import StatsCard from "../ui/StatsCard";

const DashboardStats = () => {
  const { locale, t } = useTranslation();

  const stats = useMemo<Stats[]>(
    () => [
      {
        title: t("dashboard.stats.totalOrders.title"),
        value: formatNumber(1254, locale),
        description: t("dashboard.stats.totalOrders.description"),
        icon: ShoppingBag,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        title: t("dashboard.stats.revenue.title"),
        value: formatPrice(84250, locale),
        description: t("dashboard.stats.revenue.description"),
        icon: DollarSign,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
      },
      {
        title: t("dashboard.stats.menuItems.title"),
        value: formatNumber(128, locale),
        description: t("dashboard.stats.menuItems.description"),
        icon: UtensilsCrossed,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
      },
      {
        title: t("dashboard.stats.averageRating.title"),
        value: formatDecimal(4.8, locale, 1),
        description: t("dashboard.stats.averageRating.description"),
        icon: Star,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-600",
      },
    ],
    [locale, t],
  );

  return <StatsCard stats={stats} />;
};

export default DashboardStats;
