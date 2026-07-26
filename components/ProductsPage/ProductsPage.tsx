"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ProductTable from "./ProductTable";
import ProductsHeader from "./ProductsHeader";
import ProductsStats from "./ProductsStats";
import ProductsStatsSkeleton from "../ui/ProductStateSkeleton";
import SearchInput from "../ui/SearchInput";

import { useProducts } from "@/hooks/useProducts";

const ProductsPage = () => {
  const { data, isLoading, error } = useProducts();
  const [search, setSearch] = useState("");

  const filteredProducts =
    data?.products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  return (
    <main className="space-y-6 p-6">
      <ProductsHeader />

      {isLoading ? (
        <ProductsStatsSkeleton />
      ) : (
        data && <ProductsStats data={data} />
      )}

      <Card className="shadow-sm">
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle>Product List</CardTitle>

            <CardDescription>
              Browse, search and manage your products.
            </CardDescription>
          </div>

          <SearchInput value={search} onChange={setSearch} />
        </CardHeader>

        <CardContent>
          {error ? (
            <div className="flex h-52 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600">
              Failed to load products.
            </div>
          ) : (
            <ProductTable products={filteredProducts} />
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default ProductsPage;
