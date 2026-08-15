"use client";

import { useMemo, useState } from "react";
import { usePagination } from "@/hooks/usePagination";
import { useGetSales } from "@/hooks/useGetSales";
import SalesStats from "./SalesStats";
import AppLoader from "../ui/AppLoader";
import DataTableLayout from "../ui/DataTableLayout";
import SearchInput from "../ui/SearchInput";
import SalesTable from "./SalesTable";
import StatsCardsSkeleton from "../ui/StatsCardsSkeleton";
import TablePagination from "../ui/TablePagination";
import { useTranslation } from "@/providers/LanguageProvider";

const SalesPage = () => {
  const [search, setSearch] = useState<string>("");
  const { t } = useTranslation();
  const { data: sales, isLoading, isError, isFetching } = useGetSales();

  const filteredSales = useMemo(
    () =>
      sales?.sales.filter((sale) =>
        sale.customer.toLowerCase().includes(search.toLowerCase()),
      ) ?? [],
    [sales?.sales, search],
  );

  const {
    paginatedData,
    currentPage,
    totalPages,
    prevPage,
    nextPage,
    goToPage,
  } = usePagination({
    data: filteredSales,
    itemsPerPage: 10,
  });

  return (
    <main className="space-y-6 p-6">
      {isLoading && <StatsCardsSkeleton />}
      {isError && <p>{t("sales.errorLoading")}</p>}
      {sales && <SalesStats data={sales} />}

      {isFetching && <AppLoader />}
      <DataTableLayout
        title={t("sales.listTitle")}
        description={t("sales.listDescription")}
        toolbar={
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={t("sales.searchPlaceholder")}
          />
        }
      >
        <SalesTable sales={paginatedData} />
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onPrevious={prevPage}
          onNext={nextPage}
        />
      </DataTableLayout>
    </main>
  );
};

export default SalesPage;
