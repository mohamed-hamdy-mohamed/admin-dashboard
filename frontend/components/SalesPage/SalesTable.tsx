"use client";

import { TableHead } from "@/components/atoms/ui/table";
import CatalogTable from "@/components/molecules/CatalogTable";
import { Sale } from "@/types/sales";
import SalesTableRow from "./SalesTableRow";
import { useTranslation } from "@/providers/LanguageProvider";

interface Props {
  sales: Sale[];
}

const SalesTable = ({ sales }: Props) => {
  const { t } = useTranslation();

  return (
    <CatalogTable
      colSpan={7}
      emptyMessage={t("sales.empty")}
      isEmpty={sales.length === 0}
      columns={
        <>
          <TableHead>{t("sales.table.customer")}</TableHead>
          <TableHead>{t("sales.table.product")}</TableHead>
          <TableHead>{t("sales.table.amount")}</TableHead>
          <TableHead>{t("sales.table.qty")}</TableHead>
          <TableHead>{t("sales.table.payment")}</TableHead>
          <TableHead>{t("sales.table.status")}</TableHead>
          <TableHead>{t("sales.table.date")}</TableHead>
        </>
      }
    >
      {sales.map((sale) => (
        <SalesTableRow key={sale.id} sale={sale} />
      ))}
    </CatalogTable>
  );
};

export default SalesTable;
