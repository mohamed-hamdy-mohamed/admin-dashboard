"use client";

import { memo, useMemo } from "react";
import CatalogDataTable from "@/components/molecules/CatalogDataTable";
import { CATALOG_PRIORITY_ROWS } from "@/constants/catalog";
import { Product } from "@/types/products";
import ProductTableRow from "./ProductTableRow";
import { useTranslation } from "@/providers/LanguageProvider";

interface ProductTableProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductTable = ({ products, isLoading = false }: ProductTableProps) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      { label: t("products.table.image"), className: "w-[70px]" },
      { label: t("products.table.product") },
      { label: t("products.table.category") },
      { label: t("products.table.price") },
      { label: t("products.table.stock") },
      { label: t("products.table.rating") },
      { label: t("products.table.status") },
    ],
    [t],
  );

  return (
    <CatalogDataTable
      columns={columns}
      emptyMessage={t("products.empty")}
      isLoading={isLoading}
      isEmpty={products.length === 0}
      skeletonLeading="image"
    >
      {products.map((product, index) => (
        <ProductTableRow
          key={product.id}
          product={product}
          priority={index < CATALOG_PRIORITY_ROWS}
        />
      ))}
    </CatalogDataTable>
  );
};

export default memo(ProductTable);
