"use client";

import Image from "next/image";

import { TableCell, TableRow } from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Product } from "@/types/products";

interface ProductTableRowProps {
  product: Product;
}

const ProductTableRow = ({ product }: ProductTableRowProps) => {
  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <TableCell>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={50}
          height={50}
          className="rounded-lg object-cover"
        />
      </TableCell>

      <TableCell>
        <div>
          <p className="font-semibold">{product.title}</p>

          <p className="text-sm text-muted-foreground">{product.brand}</p>
        </div>
      </TableCell>

      <TableCell>{product.category}</TableCell>

      <TableCell>${product.price}</TableCell>

      <TableCell>{product.stock}</TableCell>

      <TableCell>⭐ {product.rating}</TableCell>

      <TableCell>
        <Badge
          variant={
            product.availabilityStatus === "In Stock" ? "default" : "secondary"
          }
        >
          {product.availabilityStatus}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
