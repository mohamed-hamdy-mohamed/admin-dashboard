import DashboardStats from "./DashboardStats";
import DashboardCharts from "./DashboardCharts";

const DashboardPage = () => {
  return (
    <section className="space-y-6 px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Stats  */}
      <DashboardStats />
      {/* Dashboard Charts  */}
      <DashboardCharts />
    </section>
  );
};

export default DashboardPage;
