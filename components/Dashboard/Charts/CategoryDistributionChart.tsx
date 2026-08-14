"use client";
import { categoryChart } from "@/constants/analytics-charts";
import { chartLegendStyle, chartTooltipContentStyle } from "@/constants/chart-theme";
import { motion } from "framer-motion";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CategoryDistributionChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="rounded-xl bg-card border border-border shadow-sm p-6"
    >
      {/* Category Title  */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Category Distribution
          </h2>
          <p className="text-sm text-muted-foreground">
            Sales distribution by category
          </p>
        </div>
      </div>
      {/* Category Distribution Chart  */}
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryChart}
              cx="50%"
              cy="50%"
              labelLine={false}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
            >
              {categoryChart.map((category, idx) => (
                <Cell key={`cell-${idx}`} fill={category.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}%`, `${name}`]}
              contentStyle={chartTooltipContentStyle}
            />
            <Legend
              iconType="circle"
              layout="horizontal"
              wrapperStyle={chartLegendStyle}
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;
