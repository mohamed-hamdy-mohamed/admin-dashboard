import DashboardSalesChart from "./Charts/DashboardSalesChart";
import CategoryDistributionCharts from "./Charts/CategoryDistributionChart";
import OrderDistributionChart from "./Charts/OrderDistributionChart";
import ProductPerformanceChart from "./Charts/ProductPerformanceChart";

const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
      <DashboardSalesChart />
      <CategoryDistributionCharts />
      <OrderDistributionChart />
      <ProductPerformanceChart />
    </div>
  );
};

export default DashboardCharts;
