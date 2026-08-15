"use client";

import { useMemo, useState } from "react";

import { PAGE_CONTENT_CLASSNAME } from "@/constants/layout";
import { usePagination } from "@/hooks/usePagination";
import ProductTable from "./ProductTable";
import ProductsStats from "./ProductsStats";
import SearchInput from "../ui/SearchInput";
import { useGetProducts } from "@/hooks/useGetProducts";
import StatsCardsSkeleton from "../ui/StatsCardsSkeleton";
import DataTableLayout from "../ui/DataTableLayout";
import AppLoader from "../ui/AppLoader";
import TablePagination from "../ui/TablePagination";
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
    <main className={PAGE_CONTENT_CLASSNAME}>
      {isLoading ? (
        <StatsCardsSkeleton cards={4} />
      ) : (
        data && <ProductsStats data={data} />
      )}
      {isFetching && <AppLoader />}
      <DataTableLayout
        title={t("products.listTitle")}
        description={t("products.listDescription")}
        toolbar={
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={t("products.searchPlaceholder")}
          />
        }
      >
        <ProductTable products={paginatedData} />
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

export default ProductsPage;
