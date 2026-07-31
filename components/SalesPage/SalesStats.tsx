import { SalesResponse } from "@/types/sales";
import { DollarSign, Receipt, ShoppingBag, TrendingUp } from "lucide-react";
import StatsCard from "../ui/StatsCard";
import { formatPrice } from "@/util/formatPrice";
import { formatNumber } from "@/util/formatNumber";
import { Stats } from "@/types/stats";

interface SalesStatsProps {
  data: SalesResponse;
}

const SalesStats = ({ data }: SalesStatsProps) => {
  const sales = data.sales;

  const totalRevenue = sales.reduce(
    (acc, sale) => acc + sale.amount * sale.quantity,
    0,
  );

  const totalOrders = sales.length;

  const averageOrders = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const completedOrders = sales.filter(
    (sale) => sale.status === "Completed",
  ).length;

  const completionRate =
    totalOrders > 0 ? ((completedOrders / totalOrders) * 100).toFixed(0) : "0";

  const stats: Stats[] = [
    {
      title: "Revenue",
      value: formatPrice(totalRevenue),
      description: "Total revenue",
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Orders",
      value: totalOrders,
      description: "Total orders",
      icon: ShoppingBag,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Average Order",
      value: formatNumber(averageOrders),
      description: "Average order value",
      icon: Receipt,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      description: "Completed sales",
      icon: TrendingUp,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
    },
  ];

  return <StatsCard stats={stats} />;
};

export default SalesStats;
