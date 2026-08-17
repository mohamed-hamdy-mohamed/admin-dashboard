"use client";

import { useGetSales } from "@/hooks/useGetSales";
import { useCatalogCollection } from "@/hooks/useCatalogCollection";
import SalesStats from "./SalesStats";
import SalesTable from "./SalesTable";
import CatalogPageTemplate from "@/components/templates/CatalogPageTemplate";
import { useTranslation } from "@/providers/LanguageProvider";
import type { Sale } from "@/types/sales";

const matchSale = (sale: Sale, query: string) =>
  sale.customer.toLowerCase().includes(query);

const SalesPage = () => {
  const { t } = useTranslation();
  const { data: sales, isLoading, isError } = useGetSales();
  const {
    search,
    setSearch,
    paginatedData,
    currentPage,
    totalPages,
    prevPage,
    nextPage,
    goToPage,
  } = useCatalogCollection({
    items: sales?.sales,
    match: matchSale,
  });

  return (
    <CatalogPageTemplate
      isLoading={isLoading}
      header={
        isError ? (
          <p>{t("sales.errorLoading")}</p>
        ) : (
          sales && <SalesStats data={sales} />
        )
      }
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
      <SalesTable isLoading={isLoading} sales={paginatedData} />
    </CatalogPageTemplate>
  );
};

export default SalesPage;
