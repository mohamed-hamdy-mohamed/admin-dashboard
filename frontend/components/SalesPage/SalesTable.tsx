"use client";

import { memo, useMemo } from "react";
import CatalogDataTable from "@/components/molecules/CatalogDataTable";
import { CATALOG_PRIORITY_ROWS } from "@/constants/catalog";
import { Sale } from "@/types/sales";
import SalesTableRow from "./SalesTableRow";
import { useTranslation } from "@/providers/LanguageProvider";

interface Props {
  sales: Sale[];
  isLoading?: boolean;
}

const SalesTable = ({ sales, isLoading = false }: Props) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      { label: t("sales.table.customer") },
      { label: t("sales.table.product") },
      { label: t("sales.table.amount") },
      { label: t("sales.table.qty") },
      { label: t("sales.table.payment") },
      { label: t("sales.table.status") },
      { label: t("sales.table.date") },
    ],
    [t],
  );

  return (
    <CatalogDataTable
      columns={columns}
      emptyMessage={t("sales.empty")}
      isLoading={isLoading}
      isEmpty={sales.length === 0}
      skeletonLeading="avatar"
    >
      {sales.map((sale, index) => (
        <SalesTableRow
          key={sale.id}
          sale={sale}
          priority={index < CATALOG_PRIORITY_ROWS}
        />
      ))}
    </CatalogDataTable>
  );
};

export default memo(SalesTable);
