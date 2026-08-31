"use client";

import { memo, useCallback, useMemo } from "react";
import CatalogListTable from "@/shared/molecules/CatalogListTable";
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

  const renderRow = useCallback(
    (product: Product, priority: boolean) => (
      <ProductTableRow
        key={product.id}
        product={product}
        priority={priority}
      />
    ),
    [],
  );

  return (
    <CatalogListTable
      items={products}
      isLoading={isLoading}
      columns={columns}
      emptyMessage={t("products.empty")}
      skeletonLeading="image"
      renderRow={renderRow}
    />
  );
};

export default memo(ProductTable);
