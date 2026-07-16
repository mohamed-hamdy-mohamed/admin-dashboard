"use client";
import { dashboardStats } from "@/constants/dashboard-stats";
import { motion } from "framer-motion";

const DashboardStats = () => {
  return (
    <motion.div
      className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 1 }}
    >
      {dashboardStats.map((stat) => {
        return (
          <div key={stat.title}>
            {/* Stats Cards  */}
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              }}
              className={`flex items-center p-4 rounded-2xl border border-slate-200 bg-white ${stat.iconBg}`}
            >
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              <div className="ml-4">
                <p className="text-[14px] font-semibold text-slate-500">
                  {stat.title}
                </p>
                <p className="text-2xl font-semibold text-slate-900">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default DashboardStats;
