"use client";

import { memo, useMemo } from "react";
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

const TICK_STYLE_MD = { fontSize: 12 };
const TICK_STYLE_SM = { fontSize: 10 };
const LINE_DOT_MD = { r: 4 };
const LINE_DOT_SM = { r: 3 };
const LINE_ACTIVE_DOT_MD = { r: 6 };
const LINE_ACTIVE_DOT_SM = { r: 5 };

const DashboardSalesChart = memo(() => {
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
  const tickStyle = isMdUp ? TICK_STYLE_MD : TICK_STYLE_SM;
  const lineDot = isMdUp ? LINE_DOT_MD : LINE_DOT_SM;
  const lineActiveDot = isMdUp ? LINE_ACTIVE_DOT_MD : LINE_ACTIVE_DOT_SM;

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
              tick={tickStyle}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke={chartAxisStroke}
              tick={tickStyle}
              width={isMdUp ? 40 : 32}
              tickFormatter={tickFormatter}
            />
            <Tooltip
              contentStyle={chartTooltipContentStyle}
              itemStyle={chartTooltipItemStyle}
              formatter={tooltipFormatter}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#22c55e"
              strokeWidth={3}
              dot={lineDot}
              activeDot={lineActiveDot}
              isAnimationActive={false}
            />
          </LineChart>
        )}
      </MeasuredChart>
    </ChartCard>
  );
});

DashboardSalesChart.displayName = "DashboardSalesChart";

export default DashboardSalesChart;
