"use client";

import { salesDataChart } from "@/constants/analytics-charts";
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
      className="rounded-xl bg-white border border-slate-200 shadow-sm p-6"
    >
      {/* Chart Title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Monthly Revenue
          </h2>
          <p className="text-sm text-slate-500">
            Revenue generated from food orders
          </p>
        </div>
      </div>
      {/* Sales Chart  */}
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesDataChart}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis stroke="#64748b" tick={{ fontSize: 12 }} width={40} />
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                color: "#0f172a",
                fontSize: "14px",
              }}
              itemStyle={{ color: "#0f172a" }}
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
