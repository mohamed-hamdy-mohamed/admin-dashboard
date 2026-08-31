"use client";

import { memo } from "react";
import ProductTable from "./ProductTable";
import ProductsStats from "./ProductsStats";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useCatalogCollection } from "@/hooks/useCatalogCollection";
import CatalogPageTemplate from "@/shared/templates/CatalogPageTemplate";
import { useTranslation } from "@/providers/LanguageProvider";
import type { Product } from "@/types/products";

const matchProduct = (product: Product, query: string) =>
  product.title.toLowerCase().includes(query);

const ProductsPage = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetProducts();
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
    items: data?.products,
    match: matchProduct,
  });

  return (
    <CatalogPageTemplate
      isLoading={isLoading}
      header={data && <ProductsStats data={data} />}
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
      <ProductTable isLoading={isLoading} products={paginatedData} />
    </CatalogPageTemplate>
  );
};

export default memo(ProductsPage);
