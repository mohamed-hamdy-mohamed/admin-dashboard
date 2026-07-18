"use client";
import { motion } from "framer-motion";
import { categoryChart } from "@/constants/category-chart";
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
      className="rounded-xl bg-white border border-slate-200 shadow-sm p-6"
    >
      {/* Category Title  */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Category Distribution
          </h2>
          <p className="text-sm text-slate-500">
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
              contentStyle={{
                background: `#fff`,
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            />
            <Legend
              iconType="circle"
              layout="horizontal"
              wrapperStyle={{ fontSize: 12 }}
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;
