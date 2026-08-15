"use client";

import { TableHead } from "@/components/atoms/ui/table";
import CatalogTable from "@/components/molecules/CatalogTable";
import { Product } from "@/types/products";
import ProductTableRow from "./ProductTableRow";
import { useTranslation } from "@/providers/LanguageProvider";

interface ProductTableProps {
  products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  const { t } = useTranslation();

  return (
    <CatalogTable
      colSpan={7}
      emptyMessage={t("products.empty")}
      isEmpty={products.length === 0}
      columns={
        <>
          <TableHead className="w-[70px]">{t("products.table.image")}</TableHead>
          <TableHead>{t("products.table.product")}</TableHead>
          <TableHead>{t("products.table.category")}</TableHead>
          <TableHead>{t("products.table.price")}</TableHead>
          <TableHead>{t("products.table.stock")}</TableHead>
          <TableHead>{t("products.table.rating")}</TableHead>
          <TableHead>{t("products.table.status")}</TableHead>
        </>
      }
    >
      {products.map((product) => (
        <ProductTableRow key={product.id} product={product} />
      ))}
    </CatalogTable>
  );
};

export default ProductTable;
