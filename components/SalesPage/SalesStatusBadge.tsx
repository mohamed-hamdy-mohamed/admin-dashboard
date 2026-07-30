"use client";

import { Badge } from "@/components/ui/badge";
import { SaleStatus } from "@/types/sales";

interface SaleStatusBadgeProps {
  status: SaleStatus;
}

const variants = {
  Completed: "bg-green-100 text-green-700 hover:bg-green-100 border-green-200",

  Pending:
    "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200",

  Cancelled: "bg-red-100 text-red-700 hover:bg-red-100 border-red-200",

  Refunded: "bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200",
};

const SaleStatusBadge = ({ status }: SaleStatusBadgeProps) => {
  return (
    <Badge variant="outline" className={variants[status]}>
      {status}
    </Badge>
  );
};

export default SaleStatusBadge;
