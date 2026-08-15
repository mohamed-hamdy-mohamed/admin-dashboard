"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Product } from "@/types/products";
import ProductTableRow from "./ProductTableRow";
import { useTranslation } from "@/providers/LanguageProvider";

interface ProductTableProps {
  products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">{t("products.table.image")}</TableHead>
            <TableHead>{t("products.table.product")}</TableHead>
            <TableHead>{t("products.table.category")}</TableHead>
            <TableHead>{t("products.table.price")}</TableHead>
            <TableHead>{t("products.table.stock")}</TableHead>
            <TableHead>{t("products.table.rating")}</TableHead>
            <TableHead>{t("products.table.status")}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductTableRow key={product.id} product={product} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                {t("products.empty")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
