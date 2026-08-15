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
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import MeasuredChart from "../MeasuredChart";

const DashboardSalesChart = () => {
  const { locale, t } = useTranslation();
  const isMdUp = useMediaQuery(MEDIA_QUERIES.md);
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
    <div className="min-w-0 animate-in fade-in slide-in-from-bottom-5 rounded-xl border border-border bg-card p-4 shadow-sm fill-mode-both duration-500 delay-200 sm:p-6">
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
        <MeasuredChart>
          {({ width, height }) => (
            <LineChart width={width} height={height} data={salesDataChart}>
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
                isAnimationActive={false}
              />
            </LineChart>
          )}
        </MeasuredChart>
      </div>
    </div>
  );
};

export default DashboardSalesChart;
