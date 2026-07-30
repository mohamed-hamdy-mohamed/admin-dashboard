"use client";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
} from "@/components/ui/table";

import { Sale } from "@/types/sales";
import SalesTableRow from "./SalesTableRow";

interface Props {
  sales: Sale[];
}

const SalesTable = ({ sales }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sales.map((sale) => (
            <SalesTableRow key={sale.id} sale={sale} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SalesTable;
