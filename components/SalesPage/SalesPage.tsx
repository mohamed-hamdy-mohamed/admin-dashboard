"use client";
import { useGetSales } from "@/hooks/useGetSales";
import SalesStats from "./SalesStats";
import AppLoader from "../ui/AppLoader";
import DataTableLayout from "../ui/DataTableLayout";
import { useState } from "react";
import SearchInput from "../ui/SearchInput";
import SalesTable from "./SalesTable";
import StatsCardsSkeleton from "../ui/StatsCardsSkeleton";

const SalesPage = () => {
  const [search, setSearch] = useState<string>("");
  const { data: sales, isLoading, isError, isFetching } = useGetSales();

  const filteredSales =
    sales?.sales.filter((sale) =>
      sale.customer.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  return (
    <main className="space-y-6 p-6">
      {isLoading && <StatsCardsSkeleton />}
      {isError && <p>Error loading sales data.</p>}
      {sales && <SalesStats data={sales} />}

      {isFetching && <AppLoader />}
      <DataTableLayout
        title="Sales List"
        description="Browse, search and manage your sales."
        toolbar={<SearchInput value={search} onChange={setSearch} />}
      >
        <SalesTable sales={filteredSales} />
      </DataTableLayout>
    </main>
  );
};

export default SalesPage;
