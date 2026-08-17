"use client";

import { memo, useCallback, useMemo } from "react";
import { getOrderDistributionChart } from "@/lib/chartData";
import { chartLegendStyle, chartTooltipContentStyle } from "@/constants/chart-theme";
import { MEDIA_QUERIES } from "@/constants/breakpoints";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/providers/LanguageProvider";
import {
  createChartPieLabelFormatter,
  createChartTooltipPercentFormatter,
} from "@/util/chartFormat";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import ChartCard from "@/components/molecules/ChartCard";
import MeasuredChart, { type ChartSize } from "../MeasuredChart";

const OrderDistributionChart = () => {
  const { locale, t } = useTranslation();
  const isMdUp = useMediaQuery(MEDIA_QUERIES.md);
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

  const renderChart = useCallback(
    ({ width, height }: ChartSize) => (
      <PieChart id="dashboard-orders" width={width} height={height}>
        <Pie
          outerRadius={isMdUp ? 85 : 70}
          innerRadius={isMdUp ? 45 : 36}
          data={orderDistribution}
          cx="50%"
          cy="50%"
          labelLine={false}
          dataKey="value"
          label={isMdUp ? pieLabelFormatter : false}
          isAnimationActive={false}
        >
          {orderDistribution.map((category) => (
            <Cell key={`order-${category.name}`} fill={category.color} />
          ))}
        </Pie>
        <Tooltip
          isAnimationActive={false}
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
    ),
    [isMdUp, orderDistribution, pieLabelFormatter, tooltipFormatter],
  );

  return (
    <ChartCard
      title={t("charts.orderStatus.title")}
      subtitle={t("charts.orderStatus.subtitle")}
    >
      <MeasuredChart>{renderChart}</MeasuredChart>
    </ChartCard>
  );
};

export default memo(OrderDistributionChart);
