import QueryProvider from "@/providers/QueryProvider";
import SalesPage from "@/components/SalesPage/SalesPage";

const Sales = () => {
  return (
    <QueryProvider>
      <SalesPage />
    </QueryProvider>
  );
};

export default Sales;
