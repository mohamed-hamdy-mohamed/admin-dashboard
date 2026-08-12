"use client";

import { dashboardStats } from "@/constants/dashboard-stats";
import StatsCard from "../ui/StatsCard";

const DashboardStats = () => {
  return <StatsCard stats={dashboardStats} />;
};

export default DashboardStats;
