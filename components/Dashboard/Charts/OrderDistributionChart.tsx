"use client";

import { useMemo } from "react";
import { getOrderDistributionChart } from "@/lib/chartData";
import { chartLegendStyle, chartTooltipContentStyle } from "@/constants/chart-theme";
import { useTranslation } from "@/providers/LanguageProvider";
import {
  createChartPieLabelFormatter,
  createChartTooltipPercentFormatter,
} from "@/util/chartFormat";
import { motion } from "framer-motion";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const OrderDistributionChart = () => {
  const { locale, t } = useTranslation();
  const orderDistribution = useMemo(
    () => getOrderDistributionChart(locale),
    [locale],
  );
  const pieLabelFormatter = useMemo(
    () => createChartPieLabelFormatter(locale),
    [locale],
  );
  const tooltipFormatter = useMemo(
    () => createChartTooltipPercentFormatter(locale),
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
            {t("charts.orderStatus.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("charts.orderStatus.subtitle")}
          </p>
        </div>
      </div>

      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              outerRadius={85}
              innerRadius={45}
              data={orderDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              dataKey="value"
              label={pieLabelFormatter}
            >
              {orderDistribution.map((category, idx) => (
                <Cell key={`cell-${idx}`} fill={category.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={tooltipFormatter}
              contentStyle={chartTooltipContentStyle}
            />
            <Legend
              iconType="circle"
              layout="horizontal"
              wrapperStyle={chartLegendStyle}
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default OrderDistributionChart;
