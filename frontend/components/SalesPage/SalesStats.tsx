"use client";

import { memo, useMemo } from "react";
import { SalesResponse } from "@/types/sales";
import { DollarSign, Receipt, ShoppingBag, TrendingUp } from "lucide-react";
import StatsCard from "../../shared/atoms/StatsCard";
import { formatPrice } from "@/util/formatPrice";
import { formatNumber, formatDecimal, formatPercent } from "@/util/formatNumber";
import { Stats } from "@/types/stats";
import { useTranslation } from "@/providers/LanguageProvider";

interface SalesStatsProps {
  data: SalesResponse;
}

const SalesStats = ({ data }: SalesStatsProps) => {
  const { locale, t } = useTranslation();

  const stats = useMemo<Stats[]>(() => {
    const sales = data.sales;
    const totalOrders = sales.length;
    let totalRevenue = 0;
    let completedOrders = 0;

    for (const sale of sales) {
      totalRevenue += sale.amount * sale.quantity;
      if (sale.status === "Completed") {
        completedOrders += 1;
      }
    }

    const averageOrders = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const completionRate =
      totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;

    return [
      {
        title: t("sales.stats.revenue.title"),
        value: formatPrice(totalRevenue, locale),
        description: t("sales.stats.revenue.description"),
        icon: DollarSign,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
      },
      {
        title: t("sales.stats.orders.title"),
        value: formatNumber(totalOrders, locale),
        description: t("sales.stats.orders.description"),
        icon: ShoppingBag,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        title: t("sales.stats.averageOrder.title"),
        value: formatDecimal(averageOrders, locale, 0),
        description: t("sales.stats.averageOrder.description"),
        icon: Receipt,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
      },
      {
        title: t("sales.stats.completionRate.title"),
        value: formatPercent(completionRate, locale),
        description: t("sales.stats.completionRate.description"),
        icon: TrendingUp,
        iconBg: "bg-violet-100",
        iconColor: "text-violet-600",
      },
    ];
  }, [data.sales, locale, t]);

  return <StatsCard stats={stats} />;
};

export default memo(SalesStats);
