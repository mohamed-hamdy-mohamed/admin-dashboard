"use client";

import { useMemo, useState } from "react";
import { usePagination } from "@/hooks/usePagination";
import ProductTable from "./ProductTable";
import ProductsStats from "./ProductsStats";
import { useGetProducts } from "@/hooks/useGetProducts";
import StatsCardsSkeleton from "../atoms/ui/StatsCardsSkeleton";
import CatalogPageTemplate from "@/components/templates/CatalogPageTemplate";
import { useTranslation } from "@/providers/LanguageProvider";

const ProductsPage = () => {
  const [search, setSearch] = useState<string>("");
  const { t } = useTranslation();
  const { data, isLoading, isFetching } = useGetProducts();

  const filteredProducts = useMemo(
    () =>
      data?.products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      ) ?? [],
    [data?.products, search],
  );

  const {
    paginatedData,
    currentPage,
    totalPages,
    prevPage,
    nextPage,
    goToPage,
  } = usePagination({
    data: filteredProducts,
    itemsPerPage: 10,
  });

  return (
    <CatalogPageTemplate
      header={
        isLoading ? (
          <StatsCardsSkeleton cards={4} />
        ) : (
          data && <ProductsStats data={data} />
        )
      }
      isFetching={isFetching}
      title={t("products.listTitle")}
      description={t("products.listDescription")}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder={t("products.searchPlaceholder")}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={goToPage}
      onPrevious={prevPage}
      onNext={nextPage}
    >
      <ProductTable products={paginatedData} />
    </CatalogPageTemplate>
  );
};

export default ProductsPage;
