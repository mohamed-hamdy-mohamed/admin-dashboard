"use client";

import { memo, useMemo } from "react";
import { DollarSign, ShoppingBag, Star, UtensilsCrossed } from "lucide-react";
import { useTranslation } from "@/providers/LanguageProvider";
import { Stats } from "@/types/stats";
import { formatDecimal, formatNumber } from "@/util/formatNumber";
import { formatPrice } from "@/util/formatPrice";

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

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border border-border bg-card p-4 sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {stat.value}
                </h2>
                <p className="mt-2 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <Icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default memo(DashboardStats);
