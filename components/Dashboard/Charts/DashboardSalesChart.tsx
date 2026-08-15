"use client";

import { useMemo } from "react";
import { getSalesDataChart } from "@/lib/chartData";
import {
  chartAxisStroke,
  chartGridStroke,
  chartTooltipContentStyle,
  chartTooltipItemStyle,
} from "@/constants/chart-theme";
import { useTranslation } from "@/providers/LanguageProvider";
import {
  createChartTickFormatter,
  createChartTooltipPriceFormatter,
} from "@/util/chartFormat";
import { motion } from "framer-motion";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DashboardSalesChart = () => {
  const { locale, t } = useTranslation();
  const salesDataChart = useMemo(() => getSalesDataChart(locale), [locale]);
  const tickFormatter = useMemo(
    () => createChartTickFormatter(locale),
    [locale],
  );
  const tooltipFormatter = useMemo(
    () => createChartTooltipPriceFormatter(locale),
    [locale],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="rounded-xl bg-card border border-border shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {t("charts.monthlyRevenue.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("charts.monthlyRevenue.subtitle")}
          </p>
        </div>
      </div>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesDataChart}>
            <CartesianGrid strokeDasharray="4 4" stroke={chartGridStroke} />
            <XAxis
              dataKey="month"
              stroke={chartAxisStroke}
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke={chartAxisStroke}
              tick={{ fontSize: 12 }}
              width={40}
              tickFormatter={tickFormatter}
            />
            <Tooltip
              contentStyle={chartTooltipContentStyle}
              itemStyle={chartTooltipItemStyle}
              formatter={tooltipFormatter}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DashboardSalesChart;
