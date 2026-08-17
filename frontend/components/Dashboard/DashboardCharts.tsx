"use client";

import { memo } from "react";
import DashboardSalesChart from "./Charts/DashboardSalesChart";
import CategoryDistributionChart from "./Charts/CategoryDistributionChart";
import OrderDistributionChart from "./Charts/OrderDistributionChart";
import ProductPerformanceChart from "./Charts/ProductPerformanceChart";

const DashboardCharts = memo(() => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      <DashboardSalesChart />
      <CategoryDistributionChart />
      <OrderDistributionChart />
      <ProductPerformanceChart />
    </div>
  );
});

DashboardCharts.displayName = "DashboardCharts";

export default DashboardCharts;
