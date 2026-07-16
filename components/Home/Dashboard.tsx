import DashboardSalesChart from "./DashboardSalesChart";
import DashboardStats from "./DashboardStats";

const DashboardPage = () => {
  return (
    <section className="space-y-6 px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Stats  */}
      <DashboardStats />
      {/* Sales Chart  */}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
        <DashboardSalesChart />
      </div>
    </section>
  );
};

export default DashboardPage;
