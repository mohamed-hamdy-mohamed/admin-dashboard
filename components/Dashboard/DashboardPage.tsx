import dynamic from "next/dynamic";
import StatsCardsSkeleton from "@/components/ui/StatsCardsSkeleton";
import ChartsGridSkeleton from "./ChartsGridSkeleton";

const DashboardStats = dynamic(() => import("./DashboardStats"), {
  loading: () => <StatsCardsSkeleton />,
});

const DashboardCharts = dynamic(() => import("./DashboardCharts"), {
  loading: () => <ChartsGridSkeleton />,
});

const DashboardPage = () => {
  return (
    <section className="space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <DashboardStats />
      <DashboardCharts />
    </section>
  );
};

export default DashboardPage;
