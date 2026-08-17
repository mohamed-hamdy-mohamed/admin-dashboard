"use client";

import { memo } from "react";
import Image from "next/image";

import { TableCell, TableRow } from "@/components/atoms/ui/table";

import { Badge } from "@/components/atoms/ui/badge";

import { Product } from "@/types/products";
import { useTranslation } from "@/providers/LanguageProvider";
import { formatPrice } from "@/util/formatPrice";
import { formatDecimal, formatNumber } from "@/util/formatNumber";

interface ProductTableRowProps {
  product: Product;
  priority?: boolean;
}

const statusKeyMap = {
  "In Stock": "products.status.inStock",
  "Low Stock": "products.status.lowStock",
  "Out of Stock": "products.status.outOfStock",
} as const;

const ProductTableRow = ({ product, priority = false }: ProductTableRowProps) => {
  const { locale, t } = useTranslation();
  const statusKey =
    statusKeyMap[product.availabilityStatus as keyof typeof statusKeyMap];
  const translatedStatus = statusKey ? t(statusKey) : product.availabilityStatus;

  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <TableCell>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={50}
          height={50}
          sizes="50px"
          quality={70}
          priority={priority}
          className="size-[50px] rounded-lg object-cover"
        />
      </TableCell>

      <TableCell>
        <div>
          <p className="font-semibold">{product.title}</p>

          <p className="text-sm text-muted-foreground">{product.brand}</p>
        </div>
      </TableCell>

      <TableCell>{product.category}</TableCell>

      <TableCell>{formatPrice(product.price, locale)}</TableCell>

      <TableCell>{formatNumber(product.stock, locale)}</TableCell>

      <TableCell>
        ⭐ {formatDecimal(product.rating, locale, 1)}
      </TableCell>

      <TableCell>
        <Badge
          variant={
            product.availabilityStatus === "In Stock" ? "default" : "secondary"
          }
        >
          {translatedStatus}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

export default memo(ProductTableRow);
