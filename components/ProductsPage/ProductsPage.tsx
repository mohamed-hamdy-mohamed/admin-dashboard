"use client";

import { useState } from "react";

import ProductTable from "./ProductTable";
import ProductsStats from "./ProductsStats";
import SearchInput from "../ui/SearchInput";
import { useGetProducts } from "@/hooks/useGetProducts";
import StatsCardsSkeleton from "../ui/StatsCardsSkeleton";
import DataTableLayout from "../ui/DataTableLayout";
import AppLoader from "../ui/AppLoader";

const ProductsPage = () => {
  const { data, isLoading, isFetching } = useGetProducts();
  const [search, setSearch] = useState("");

  const filteredProducts =
    data?.products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  return (
    <main className="space-y-6 p-6">
      {isLoading ? (
        <StatsCardsSkeleton cards={4} />
      ) : (
        data && <ProductsStats data={data} />
      )}
      {isFetching && <AppLoader />}{" "}
      <DataTableLayout
        title="Product List"
        description="Browse, search and manage your products."
        toolbar={<SearchInput value={search} onChange={setSearch} />}
      >
        <ProductTable products={filteredProducts} />
      </DataTableLayout>
    </main>
  );
};

export default ProductsPage;
