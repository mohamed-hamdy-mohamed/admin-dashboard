"use client";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Sale } from "@/types/sales";
import SalesTableRow from "./SalesTableRow";
import { useTranslation } from "@/providers/LanguageProvider";

interface Props {
  sales: Sale[];
}

const SalesTable = ({ sales }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("sales.table.customer")}</TableHead>
            <TableHead>{t("sales.table.product")}</TableHead>
            <TableHead>{t("sales.table.amount")}</TableHead>
            <TableHead>{t("sales.table.qty")}</TableHead>
            <TableHead>{t("sales.table.payment")}</TableHead>
            <TableHead>{t("sales.table.status")}</TableHead>
            <TableHead>{t("sales.table.date")}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sales.length > 0 ? (
            sales.map((sale) => (
              <SalesTableRow key={sale.id} sale={sale} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                {t("sales.empty")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SalesTable;
