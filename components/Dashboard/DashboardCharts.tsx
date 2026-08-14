import dynamic from "next/dynamic";
import ChartSkeleton from "./ChartSkeleton";

const DashboardSalesChart = dynamic(() => import("./Charts/DashboardSalesChart"), {
  loading: () => <ChartSkeleton />,
});

const CategoryDistributionChart = dynamic(
  () => import("./Charts/CategoryDistributionChart"),
  {
    loading: () => <ChartSkeleton />,
  },
);

const OrderDistributionChart = dynamic(
  () => import("./Charts/OrderDistributionChart"),
  {
    loading: () => <ChartSkeleton />,
  },
);

const ProductPerformanceChart = dynamic(
  () => import("./Charts/ProductPerformanceChart"),
  {
    loading: () => <ChartSkeleton />,
  },
);

const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-2">
      <DashboardSalesChart />
      <CategoryDistributionChart />
      <OrderDistributionChart />
      <ProductPerformanceChart />
    </div>
  );
};

export default DashboardCharts;
