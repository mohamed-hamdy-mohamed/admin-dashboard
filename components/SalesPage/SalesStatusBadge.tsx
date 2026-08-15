"use client";

import { Badge } from "@/components/ui/badge";
import { SaleStatus } from "@/types/sales";
import { useTranslation } from "@/providers/LanguageProvider";

interface SaleStatusBadgeProps {
  status: SaleStatus;
}

const variants = {
  Completed: "bg-green-100 text-green-700 hover:bg-green-100 border-green-200",

  Pending:
    "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200",

  Cancelled: "bg-red-100 text-red-700 hover:bg-red-100 border-red-200",

  Refunded: "bg-muted text-foreground hover:bg-muted border-border",
};

const statusKeyMap = {
  Completed: "sales.status.completed",
  Pending: "sales.status.pending",
  Cancelled: "sales.status.cancelled",
  Refunded: "sales.status.refunded",
} as const;

const SaleStatusBadge = ({ status }: SaleStatusBadgeProps) => {
  const { t } = useTranslation();

  return (
    <Badge variant="outline" className={variants[status]}>
      {t(statusKeyMap[status])}
    </Badge>
  );
};

export default SaleStatusBadge;
