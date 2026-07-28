"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ProductsResponse } from "@/types/products";
import ProductTableRow from "./ProductTableRow";

interface ProductTableProps {
  products: ProductsResponse["products"];
  
}

const ProductTable = ({ products }: ProductTableProps) => {
  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">Image</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <ProductTableRow key={product.id} product={product} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
