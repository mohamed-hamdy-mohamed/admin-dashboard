import DashboardStats from "@/components/Dashboard/DashboardStats";
import LazyDashboardCharts from "@/components/Dashboard/LazyDashboardCharts";
import { PAGE_CONTENT_CLASSNAME } from "@/constants/layout";

const DashboardPage = () => {
  return (
    <section className={PAGE_CONTENT_CLASSNAME}>
      <DashboardStats />
      <LazyDashboardCharts />
    </section>
  );
};

export default DashboardPage;
