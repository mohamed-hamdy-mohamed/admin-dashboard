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
import ChartCard from "@/components/molecules/ChartCard";
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
    </ChartCard>
  );
};

export default ProductPerformanceChart;
