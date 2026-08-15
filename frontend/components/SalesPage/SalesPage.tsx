"use client";

import { useMemo, useState } from "react";
import { usePagination } from "@/hooks/usePagination";
import { useGetSales } from "@/hooks/useGetSales";
import SalesStats from "./SalesStats";
import SalesTable from "./SalesTable";
import StatsCardsSkeleton from "../atoms/ui/StatsCardsSkeleton";
import CatalogPageTemplate from "@/components/templates/CatalogPageTemplate";
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
    <CatalogPageTemplate
      header={
        <>
          {isLoading && <StatsCardsSkeleton />}
          {isError && <p>{t("sales.errorLoading")}</p>}
          {sales && <SalesStats data={sales} />}
        </>
      }
      isFetching={isFetching}
      title={t("sales.listTitle")}
      description={t("sales.listDescription")}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder={t("sales.searchPlaceholder")}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={goToPage}
      onPrevious={prevPage}
      onNext={nextPage}
    >
      <SalesTable sales={paginatedData} />
    </CatalogPageTemplate>
  );
};

export default SalesPage;
