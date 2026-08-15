"use client";

import DashboardSalesChart from "./Charts/DashboardSalesChart";
import CategoryDistributionChart from "./Charts/CategoryDistributionChart";
import OrderDistributionChart from "./Charts/OrderDistributionChart";
import ProductPerformanceChart from "./Charts/ProductPerformanceChart";

const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      <DashboardSalesChart />
      <CategoryDistributionChart />
      <OrderDistributionChart />
      <ProductPerformanceChart />
    </div>
  );
};

export default DashboardCharts;
