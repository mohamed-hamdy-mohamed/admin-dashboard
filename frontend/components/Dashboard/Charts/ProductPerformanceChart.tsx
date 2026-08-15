"use client";

import { useMemo } from "react";
import { getProductPerformanceChart } from "@/lib/chartData";
import {
  chartAxisStroke,
  chartGridStroke,
  chartLegendStyle,
  chartTooltipContentStyle,
} from "@/constants/chart-theme";
import { MEDIA_QUERIES } from "@/constants/breakpoints";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/providers/LanguageProvider";
import { createChartTickFormatter, createChartTooltipNumberFormatter } from "@/util/chartFormat";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import MeasuredChart from "../MeasuredChart";

const ProductPerformanceChart = () => {
  const { locale, t } = useTranslation();
  const isMdUp = useMediaQuery(MEDIA_QUERIES.md);
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
    <div className="min-w-0 animate-in fade-in slide-in-from-bottom-5 rounded-xl border border-border bg-card p-4 shadow-sm fill-mode-both duration-500 delay-200 sm:p-6">
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-foreground sm:text-lg">
            {t("charts.bestSellingMenu.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("charts.bestSellingMenu.subtitle")}
          </p>
        </div>
      </div>
      <div className="h-56 sm:h-64 md:h-80">
        <MeasuredChart>
          {({ width, height }) => (
            <BarChart
              width={width}
              height={height}
              data={productPerformance}
              barGap={8}
              barCategoryGap="18%"
            >
              <CartesianGrid stroke={chartGridStroke} strokeDasharray="4 4" />
              <XAxis
                dataKey="name"
                stroke={chartAxisStroke}
                tick={{ fill: chartAxisStroke, fontSize: isMdUp ? 14 : 10 }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <YAxis
                stroke={chartAxisStroke}
                tick={{ fill: chartAxisStroke, fontSize: isMdUp ? 12 : 10 }}
                width={isMdUp ? 40 : 32}
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
                isAnimationActive={false}
              />
              <Bar
                dataKey="profit"
                name={t("charts.legend.profit")}
                fill="#22c55e"
                radius={[6, 6, 0, 0]}
                isAnimationActive={false}
              />
              <Bar
                dataKey="revenue"
                name={t("charts.legend.revenue")}
                fill="#f97316"
                radius={[6, 6, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          )}
        </MeasuredChart>
      </div>
    </div>
  );
};

export default ProductPerformanceChart;
