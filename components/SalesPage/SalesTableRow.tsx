"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sale } from "@/types/sales";
import SaleStatusBadge from "./SalesStatusBadge";

interface Props {
  sale: Sale;
}

const SalesTableRow = ({ sale }: Props) => {
  return (
    <TableRow className="transition-colors hover:bg-muted/40">
      {/* Customer */}
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11">
            <AvatarImage src={sale.avatar} />
            <AvatarFallback>{sale.customer.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{sale.customer}</p>
            <p className="text-xs text-muted-foreground">{sale.email}</p>
          </div>
        </div>
      </TableCell>
      {/* Product */}
      <TableCell>
        <div>
          <p className="font-medium">{sale.product}</p>
          <p className="text-xs text-muted-foreground">{sale.category}</p>
        </div>
      </TableCell>
      {/* Amount */}
      <TableCell>
        <span className="font-semibold">${sale.amount}</span>
      </TableCell>
      {/* Quantity */}
      <TableCell>
        <Badge variant="outline">{sale.quantity}</Badge>
      </TableCell>
      {/* Payment */}
      <TableCell>{sale.paymentMethod}</TableCell>
      {/* Status */}
      <TableCell>
        <SaleStatusBadge status={sale.status} />
      </TableCell>
      {/* Date */}
      <TableCell>{sale.date}</TableCell>
    </TableRow>
  );
};

export default SalesTableRow;
