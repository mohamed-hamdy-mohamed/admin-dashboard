"use client";

import { memo, useCallback, useMemo } from "react";
import { getSalesDataChart } from "@/lib/chartData";
import {
  chartAxisStroke,
  chartGridStroke,
  chartTickMd,
  chartTickSm,
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
import ChartCard from "@/shared/molecules/ChartCard";
import MeasuredChart, { type ChartSize } from "../MeasuredChart";

const DOT_SM = { r: 3 };
const DOT_MD = { r: 4 };
const ACTIVE_DOT_SM = { r: 5 };
const ACTIVE_DOT_MD = { r: 6 };

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
  const tick = isMdUp ? chartTickMd : chartTickSm;

  const renderChart = useCallback(
    ({ width, height }: ChartSize) => (
      <LineChart
        id="dashboard-sales"
        width={width}
        height={height}
        data={salesDataChart}
      >
        <CartesianGrid strokeDasharray="4 4" stroke={chartGridStroke} />
        <XAxis
          dataKey="month"
          stroke={chartAxisStroke}
          tick={tick}
          interval="preserveStartEnd"
        />
        <YAxis
          stroke={chartAxisStroke}
          tick={tick}
          width={isMdUp ? 40 : 32}
          tickFormatter={tickFormatter}
        />
        <Tooltip
          isAnimationActive={false}
          contentStyle={chartTooltipContentStyle}
          itemStyle={chartTooltipItemStyle}
          formatter={tooltipFormatter}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#22c55e"
          strokeWidth={3}
          dot={isMdUp ? DOT_MD : DOT_SM}
          activeDot={isMdUp ? ACTIVE_DOT_MD : ACTIVE_DOT_SM}
          isAnimationActive={false}
        />
      </LineChart>
    ),
    [isMdUp, salesDataChart, tick, tickFormatter, tooltipFormatter],
  );

  return (
    <ChartCard
      title={t("charts.monthlyRevenue.title")}
      subtitle={t("charts.monthlyRevenue.subtitle")}
    >
      <MeasuredChart>{renderChart}</MeasuredChart>
    </ChartCard>
  );
};

export default memo(DashboardSalesChart);
