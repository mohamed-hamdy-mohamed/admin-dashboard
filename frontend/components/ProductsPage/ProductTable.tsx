"use client";

import { memo, useMemo } from "react";
import CatalogListTable from "@/components/molecules/CatalogListTable";
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
    <CatalogListTable
      items={products}
      isLoading={isLoading}
      columns={columns}
      emptyMessage={t("products.empty")}
      skeletonLeading="image"
      renderRow={(product, priority) => (
        <ProductTableRow
          key={product.id}
          product={product}
          priority={priority}
        />
      )}
    />
  );
};

export default memo(ProductTable);
