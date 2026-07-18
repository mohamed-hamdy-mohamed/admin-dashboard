"use client";

import { productPerformance } from "@/constants/product-performance";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ProductPerformanceChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="rounded-xl bg-white border border-slate-200 shadow-sm p-6"
    >
      {/* Product Performance Chart Title  */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Product Performance
          </h2>
          <p className="text-sm text-slate-500">
            Performance of products based on sales and revenue
          </p>
        </div>
      </div>
      {/* Product Performance Chart */}
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={productPerformance} barGap={8} barCategoryGap="18%">
            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              tick={{ fill: "#64748b", fontSize: 14 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: "#64748b", fontSize: 12 }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                background: `#fff`,
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{
                color: "#fff",
                paddingTop: 15,
              }}
            />{" "}
            <Bar dataKey="profit" fill="#67C56C" radius={[6, 6, 0, 0]} />
            <Bar dataKey="retention" fill="#FF7849" radius={[6, 6, 0, 0]} />
            <Bar dataKey="revenue" fill="#33B5FF" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ProductPerformanceChart;
