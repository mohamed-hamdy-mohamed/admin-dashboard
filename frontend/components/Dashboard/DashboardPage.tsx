import dynamic from "next/dynamic";
import StatsCardsSkeleton from "@/components/ui/StatsCardsSkeleton";
import { PAGE_CONTENT_CLASSNAME } from "@/constants/layout";
import ChartsGridSkeleton from "./ChartsGridSkeleton";

const DashboardStats = dynamic(() => import("./DashboardStats"), {
  loading: () => <StatsCardsSkeleton />,
});

const DashboardCharts = dynamic(() => import("./DashboardCharts"), {
  loading: () => <ChartsGridSkeleton />,
});

const DashboardPage = () => {
  return (
    <section className={PAGE_CONTENT_CLASSNAME}>
      <DashboardStats />
      <DashboardCharts />
    </section>
  );
};

export default DashboardPage;
