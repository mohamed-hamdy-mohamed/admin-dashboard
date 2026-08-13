"use client";

import { useMemo, useState } from "react";
import { usePagination } from "@/hooks/usePagination";
import StatsCardsSkeleton from "../ui/StatsCardsSkeleton";
import DataTableLayout from "../ui/DataTableLayout";
import SearchInput from "../ui/SearchInput";
import RecipesStats from "./RecipesStats";
import RecipesTable from "./RecipesTable";
import AppLoader from "../ui/AppLoader";
import { useGetRecipes } from "@/hooks/useGetOrders";
import TablePagination from "../ui/TablePagination";

const RecipesPage = () => {
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isFetching } = useGetRecipes();

  const filteredRecipes = useMemo(
    () =>
      data?.recipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(search.toLowerCase()) ||
          recipe.cuisine.toLowerCase().includes(search.toLowerCase()),
      ) ?? [],
    [data?.recipes, search],
  );

  const {
    paginatedData,
    currentPage,
    totalPages,
    prevPage,
    nextPage,
    goToPage,
  } = usePagination({
    data: filteredRecipes,
    itemsPerPage: 10,
  });

  return (
    <main className="space-y-6 p-6">
      {isLoading ? (
        <StatsCardsSkeleton cards={4} />
      ) : (
        data && <RecipesStats data={data} />
      )}

      {isFetching && <AppLoader />}

      <DataTableLayout
        title="Recipes List"
        description="Track and manage recipes."
        toolbar={<SearchInput value={search} onChange={setSearch} />}
      >
        <RecipesTable recipes={paginatedData} />
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onPrevious={prevPage}
          onNext={nextPage}
        />
      </DataTableLayout>
    </main>
  );
};

export default RecipesPage;
