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
import ChartCard from "@/components/molecules/ChartCard";
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
    <ChartCard
      title={t("charts.monthlyRevenue.title")}
      subtitle={t("charts.monthlyRevenue.subtitle")}
    >
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
    </ChartCard>
  );
};

export default DashboardSalesChart;
