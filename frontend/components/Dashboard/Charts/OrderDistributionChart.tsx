"use client";

import { useMemo } from "react";
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
import MeasuredChart from "../MeasuredChart";

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

  return (
    <div className="min-w-0 animate-in fade-in slide-in-from-bottom-5 rounded-xl border border-border bg-card p-4 shadow-sm fill-mode-both duration-500 delay-200 sm:p-6">
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-foreground sm:text-lg">
            {t("charts.orderStatus.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("charts.orderStatus.subtitle")}
          </p>
        </div>
      </div>

      <div className="h-56 sm:h-64 md:h-80">
        <MeasuredChart>
          {({ width, height }) => (
            <PieChart width={width} height={height}>
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
                {orderDistribution.map((category, idx) => (
                  <Cell key={`cell-${idx}`} fill={category.color} />
                ))}
              </Pie>
              <Tooltip
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
          )}
        </MeasuredChart>
      </div>
    </div>
  );
};

export default OrderDistributionChart;
