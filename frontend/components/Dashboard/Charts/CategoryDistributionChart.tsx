"use client";

import { memo, useMemo } from "react";
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
import ChartCard from "@/components/molecules/ChartCard";
import MeasuredChart from "../MeasuredChart";

const CategoryDistributionChart = memo(() => {
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

  return (
    <ChartCard
      title={t("charts.categoryDistribution.title")}
      subtitle={t("charts.categoryDistribution.subtitle")}
    >
      <MeasuredChart>
        {({ width, height }) => (
          <PieChart width={width} height={height}>
            <Pie
              data={categoryChart}
              cx="50%"
              cy="50%"
              labelLine={false}
              dataKey="value"
              label={isMdUp ? pieLabelFormatter : false}
              isAnimationActive={false}
            >
              {categoryChart.map((category) => (
                <Cell key={category.name} fill={category.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={tooltipFormatter}
              contentStyle={chartTooltipContentStyle}
              isAnimationActive={false}
            />
            <Legend
              iconType="circle"
              layout="horizontal"
              wrapperStyle={chartLegendStyle}
              align="center"
            />
          </PieChart>
        )}
      </MeasuredChart>
    </ChartCard>
  );
});

CategoryDistributionChart.displayName = "CategoryDistributionChart";

export default CategoryDistributionChart;
