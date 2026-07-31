"use client";
import { useGetOrders } from "@/hooks/useGetOrders";
import { useState } from "react";
import StatsCardsSkeleton from "../ui/StatsCardsSkeleton";
import DataTableLayout from "../ui/DataTableLayout";
import SearchInput from "../ui/SearchInput";
import RecipesStats from "./RecipesStats";
import RecipesTable from "./RecipesTable";

const RecipesPage = () => {
  const { data, isLoading } = useGetOrders();
  const [search, setSearch] = useState<string>("");

  const recipes = data?.recipes ?? [];

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="space-y-6 p-6">
      {isLoading ? (
        <StatsCardsSkeleton cards={4} />
      ) : (
        data && <RecipesStats data={data} />
      )}

      <DataTableLayout
        title="Recipes List"
        description="Track and manage recipes."
        toolbar={<SearchInput value={search} onChange={setSearch} />}
      >
        <RecipesTable recipes={filteredRecipes} />
      </DataTableLayout>
    </main>
  );
};

export default RecipesPage;
