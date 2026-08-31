"use client";

import { memo } from "react";
import { TableCell, TableRow } from "@/shared/atoms/table";
import { Badge } from "@/shared/atoms/badge";
import EntityIdentity from "@/shared/molecules/EntityIdentity";
import StackedMeta from "@/shared/atoms/StackedMeta";
import { Sale } from "@/types/sales";
import SaleStatusBadge from "./SalesStatusBadge";
import { useTranslation } from "@/providers/LanguageProvider";
import { formatPrice } from "@/util/formatPrice";
import { formatNumber } from "@/util/formatNumber";
import { localizeDigitsInString } from "@/util/formatLocale";

interface Props {
  sale: Sale;
  priority?: boolean;
}

const SalesTableRow = ({ sale, priority = false }: Props) => {
  const { locale } = useTranslation();

  return (
    <TableRow className="transition-colors hover:bg-muted/40">
      <TableCell>
        <EntityIdentity
          src={sale.avatar}
          alt={sale.customer}
          fallback={sale.customer.charAt(0)}
          title={sale.customer}
          subtitle={sale.email}
          avatarClassName="h-11 w-11"
          priority={priority}
        />
      </TableCell>
      <TableCell>
        <StackedMeta title={sale.product} subtitle={sale.category} />
      </TableCell>
      <TableCell>
        <span className="font-semibold">
          {formatPrice(sale.amount, locale)}
        </span>
      </TableCell>
      <TableCell>
        <Badge variant="outline">{formatNumber(sale.quantity, locale)}</Badge>
      </TableCell>
      <TableCell>{sale.paymentMethod}</TableCell>
      <TableCell>
        <SaleStatusBadge status={sale.status} />
      </TableCell>
      <TableCell>{localizeDigitsInString(sale.date, locale)}</TableCell>
    </TableRow>
  );
};

export default memo(SalesTableRow);
