"use client";

import { useMemo } from "react";
import { getProductPerformanceChart } from "@/lib/chartData";
import {
  chartAxisStroke,
  chartGridStroke,
  chartLegendStyle,
  chartTooltipContentStyle,
} from "@/constants/chart-theme";
import { useTranslation } from "@/providers/LanguageProvider";
import { createChartTickFormatter, createChartTooltipNumberFormatter } from "@/util/chartFormat";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ProductPerformanceChart = () => {
  const { locale, t } = useTranslation();
  const productPerformance = useMemo(
    () => getProductPerformanceChart(locale),
    [locale],
  );
  const tickFormatter = useMemo(
    () => createChartTickFormatter(locale),
    [locale],
  );
  const tooltipFormatter = useMemo(
    () => createChartTooltipNumberFormatter(locale),
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
            {t("charts.bestSellingMenu.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("charts.bestSellingMenu.subtitle")}
          </p>
        </div>
      </div>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={productPerformance} barGap={8} barCategoryGap="18%">
            <CartesianGrid stroke={chartGridStroke} strokeDasharray="4 4" />
            <XAxis
              dataKey="name"
              stroke={chartAxisStroke}
              tick={{ fill: chartAxisStroke, fontSize: 14 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke={chartAxisStroke}
              tick={{ fill: chartAxisStroke, fontSize: 12 }}
              width={40}
              tickFormatter={tickFormatter}
            />
            <Tooltip
              contentStyle={chartTooltipContentStyle}
              formatter={tooltipFormatter}
            />
            <Legend iconType="circle" wrapperStyle={chartLegendStyle} />
            <Bar
              dataKey="orders"
              name={t("charts.legend.orders")}
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="profit"
              name={t("charts.legend.profit")}
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="revenue"
              name={t("charts.legend.revenue")}
              fill="#f97316"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ProductPerformanceChart;
