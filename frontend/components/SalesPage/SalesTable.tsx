"use client";

import { memo, useCallback, useMemo } from "react";
import CatalogListTable from "@/components/molecules/CatalogListTable";
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

  const renderRow = useCallback(
    (sale: Sale, priority: boolean) => (
      <SalesTableRow key={sale.id} sale={sale} priority={priority} />
    ),
    [],
  );

  return (
    <CatalogListTable
      items={sales}
      isLoading={isLoading}
      columns={columns}
      emptyMessage={t("sales.empty")}
      skeletonLeading="avatar"
      renderRow={renderRow}
    />
  );
};

export default memo(SalesTable);
