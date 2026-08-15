"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sale } from "@/types/sales";
import SaleStatusBadge from "./SalesStatusBadge";
import { useTranslation } from "@/providers/LanguageProvider";
import { formatPrice } from "@/util/formatPrice";
import { formatNumber } from "@/util/formatNumber";
import { localizeDigitsInString } from "@/util/formatLocale";

interface Props {
  sale: Sale;
}

const SalesTableRow = ({ sale }: Props) => {
  const { locale } = useTranslation();

  return (
    <TableRow className="transition-colors hover:bg-muted/40">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11">
            <AvatarImage src={sale.avatar} alt={sale.customer} sizes="44px" />
            <AvatarFallback>{sale.customer.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{sale.customer}</p>
            <p className="text-xs text-muted-foreground">{sale.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div>
          <p className="font-medium">{sale.product}</p>
          <p className="text-xs text-muted-foreground">{sale.category}</p>
        </div>
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

export default SalesTableRow;
