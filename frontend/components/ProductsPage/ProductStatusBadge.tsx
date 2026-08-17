"use client";

import { memo } from "react";
import { Badge } from "@/components/atoms/ui/badge";
import { useTranslation } from "@/providers/LanguageProvider";

const statusKeyMap = {
  "In Stock": "products.status.inStock",
  "Low Stock": "products.status.lowStock",
  "Out of Stock": "products.status.outOfStock",
} as const;

interface ProductStatusBadgeProps {
  status: string;
}

const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
  const { t } = useTranslation();
  const statusKey = statusKeyMap[status as keyof typeof statusKeyMap];

  return (
    <Badge variant={status === "In Stock" ? "default" : "secondary"}>
      {statusKey ? t(statusKey) : status}
    </Badge>
  );
};

export default memo(ProductStatusBadge);
