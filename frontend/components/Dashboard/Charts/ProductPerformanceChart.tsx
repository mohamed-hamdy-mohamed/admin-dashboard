"use client";

import { memo, useMemo } from "react";
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
import ChartCard from "@/components/molecules/ChartCard";
import MeasuredChart from "../MeasuredChart";

const X_TICK_MD = { fill: chartAxisStroke, fontSize: 14 };
const X_TICK_SM = { fill: chartAxisStroke, fontSize: 10 };
const Y_TICK_MD = { fill: chartAxisStroke, fontSize: 12 };
const Y_TICK_SM = { fill: chartAxisStroke, fontSize: 10 };
const BAR_RADIUS: [number, number, number, number] = [6, 6, 0, 0];

const ProductPerformanceChart = memo(() => {
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
  const xTick = isMdUp ? X_TICK_MD : X_TICK_SM;
  const yTick = isMdUp ? Y_TICK_MD : Y_TICK_SM;
  const ordersLabel = t("charts.legend.orders");
  const profitLabel = t("charts.legend.profit");
  const revenueLabel = t("charts.legend.revenue");

  return (
    <ChartCard
      title={t("charts.bestSellingMenu.title")}
      subtitle={t("charts.bestSellingMenu.subtitle")}
    >
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
              tick={xTick}
              axisLine={false}
              tickLine={false}
              interval={0}
            />
            <YAxis
              stroke={chartAxisStroke}
              tick={yTick}
              width={isMdUp ? 40 : 32}
              tickFormatter={tickFormatter}
            />
            <Tooltip
              contentStyle={chartTooltipContentStyle}
              formatter={tooltipFormatter}
              isAnimationActive={false}
            />
            <Legend iconType="circle" wrapperStyle={chartLegendStyle} />
            <Bar
              dataKey="orders"
              name={ordersLabel}
              fill="#2563eb"
              radius={BAR_RADIUS}
              isAnimationActive={false}
            />
            <Bar
              dataKey="profit"
              name={profitLabel}
              fill="#22c55e"
              radius={BAR_RADIUS}
              isAnimationActive={false}
            />
            <Bar
              dataKey="revenue"
              name={revenueLabel}
              fill="#f97316"
              radius={BAR_RADIUS}
              isAnimationActive={false}
            />
          </BarChart>
        )}
      </MeasuredChart>
    </ChartCard>
  );
});

ProductPerformanceChart.displayName = "ProductPerformanceChart";

export default ProductPerformanceChart;
