"use client";

import { memo, useCallback, useMemo } from "react";
import { getCategoryChart } from "@/lib/chartData";
import { chartLegendStyle, chartTooltipContentStyle } from "@/constants/chart-theme";
import { MEDIA_QUERIES } from "@/constants/breakpoints";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/providers/LanguageProvider";
import {
  createChartPieLabelFormatter,
  createChartTooltipPercentFormatter,
} from "@/util/chartFormat";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import ChartCard from "@/shared/molecules/ChartCard";
import MeasuredChart, { type ChartSize } from "../MeasuredChart";

const CategoryDistributionChart = () => {
  const { locale, t } = useTranslation();
  const isMdUp = useMediaQuery(MEDIA_QUERIES.md);
  const categoryChart = useMemo(() => getCategoryChart(locale), [locale]);
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
      <PieChart id="dashboard-category" width={width} height={height}>
        <Pie
          data={categoryChart}
          cx="50%"
          cy="50%"
          labelLine={false}
          dataKey="value"
          label={isMdUp ? pieLabelFormatter : false}
          isAnimationActive={false}
        >
          {categoryChart.map((category, idx) => (
            <Cell key={`category-${category.name}`} fill={category.color} />
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
    [categoryChart, isMdUp, pieLabelFormatter, tooltipFormatter],
  );

  return (
    <ChartCard
      title={t("charts.categoryDistribution.title")}
      subtitle={t("charts.categoryDistribution.subtitle")}
    >
      <MeasuredChart>{renderChart}</MeasuredChart>
    </ChartCard>
  );
};

export default memo(CategoryDistributionChart);
