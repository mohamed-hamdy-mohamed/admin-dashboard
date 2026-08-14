"use client";

import { orderDistribution } from "@/constants/analytics-charts";
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

const OrderDistributionChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="rounded-xl bg-card border border-border shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Order Status</h2>
          <p className="text-sm text-muted-foreground">
            Current order processing status
          </p>
        </div>
      </div>

      {/* Order Distribution Chart */}
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              outerRadius={85}
              innerRadius={45}
              data={orderDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
            >
              {orderDistribution.map((category, idx) => (
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

export default OrderDistributionChart;
