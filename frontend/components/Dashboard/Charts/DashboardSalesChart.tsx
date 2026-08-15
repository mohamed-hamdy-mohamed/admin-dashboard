"use client";

import { useMemo } from "react";
import { getSalesDataChart } from "@/lib/chartData";
import {
  chartAxisStroke,
  chartGridStroke,
  chartTooltipContentStyle,
  chartTooltipItemStyle,
} from "@/constants/chart-theme";
import { MEDIA_QUERIES } from "@/constants/breakpoints";
import { useMediaQuery } from "@/hooks/useMediaQuery";
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
  const isMdUp = useMediaQuery(MEDIA_QUERIES.md, true);
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
      className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-foreground sm:text-lg">
            {t("charts.monthlyRevenue.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("charts.monthlyRevenue.subtitle")}
          </p>
        </div>
      </div>
      <div className="h-56 sm:h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesDataChart}>
            <CartesianGrid strokeDasharray="4 4" stroke={chartGridStroke} />
            <XAxis
              dataKey="month"
              stroke={chartAxisStroke}
              tick={{ fontSize: isMdUp ? 12 : 10 }}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke={chartAxisStroke}
              tick={{ fontSize: isMdUp ? 12 : 10 }}
              width={isMdUp ? 40 : 32}
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
              dot={{ r: isMdUp ? 4 : 3 }}
              activeDot={{ r: isMdUp ? 6 : 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DashboardSalesChart;
