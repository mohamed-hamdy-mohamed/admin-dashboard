"use client";

import { salesDataChart } from "@/constants/analytics-charts";
import {
  chartAxisStroke,
  chartGridStroke,
  chartTooltipContentStyle,
  chartTooltipItemStyle,
} from "@/constants/chart-theme";
import { motion } from "framer-motion";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DashboardSalesChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="rounded-xl bg-card border border-border shadow-sm p-6"
    >
      {/* Chart Title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Monthly Revenue
          </h2>
          <p className="text-sm text-muted-foreground">
            Revenue generated from food orders
          </p>
        </div>
      </div>
      {/* Sales Chart  */}
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesDataChart}>
            <CartesianGrid strokeDasharray="4 4" stroke={chartGridStroke} />
            <XAxis
              dataKey="month"
              stroke={chartAxisStroke}
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis stroke={chartAxisStroke} tick={{ fontSize: 12 }} width={40} />
            <Tooltip
              contentStyle={chartTooltipContentStyle}
              itemStyle={chartTooltipItemStyle}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DashboardSalesChart;
