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
import RecipeViewDialog from "./RecipeViewDialog";
import RecipeEditDialog from "./RecipeEditDialog";
import { Recipe } from "@/types/recipes";
import { RecipeEditValues } from "@/types/recipe-edits";
import {
  applyRecipeEdits,
  loadRecipeEdits,
  persistRecipeEdits,
  RecipeEditsMap,
} from "@/util/recipeEdits";
import { useTranslation } from "@/providers/LanguageProvider";

const RecipesPage = () => {
  const [search, setSearch] = useState<string>("");
  const { t } = useTranslation();
  const [recipeEdits, setRecipeEdits] = useState<RecipeEditsMap>(() =>
    loadRecipeEdits(),
  );
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { data, isLoading, isFetching } = useGetRecipes();

  const recipes = useMemo(
    () => applyRecipeEdits(data?.recipes ?? [], recipeEdits),
    [data?.recipes, recipeEdits],
  );

  const mergedData = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return {
      ...data,
      recipes,
    };
  }, [data, recipes]);

  const filteredRecipes = useMemo(
    () =>
      recipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(search.toLowerCase()) ||
          recipe.cuisine.toLowerCase().includes(search.toLowerCase()),
      ),
    [recipes, search],
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

  const handleViewRecipe = (recipe: Recipe) => {
    setActiveRecipe(recipe);
    setViewOpen(true);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setActiveRecipe(recipe);
    setEditOpen(true);
  };

  const handleSaveRecipe = (values: RecipeEditValues) => {
    if (!activeRecipe) {
      return;
    }

    const nextEdits: RecipeEditsMap = {
      ...recipeEdits,
      [activeRecipe.id]: values,
    };

    setRecipeEdits(nextEdits);
    persistRecipeEdits(nextEdits);
    setActiveRecipe({
      ...activeRecipe,
      ...values,
    });
    setEditOpen(false);
  };

  return (
    <main className="space-y-6 p-6">
      {isLoading ? (
        <StatsCardsSkeleton cards={4} />
      ) : (
        mergedData && <RecipesStats data={mergedData} />
      )}

      {isFetching && <AppLoader />}

      <DataTableLayout
        title={t("recipes.listTitle")}
        description={t("recipes.listDescription")}
        toolbar={
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={t("recipes.searchPlaceholder")}
          />
        }
      >
        <RecipesTable
          recipes={paginatedData}
          onViewRecipe={handleViewRecipe}
          onEditRecipe={handleEditRecipe}
        />
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onPrevious={prevPage}
          onNext={nextPage}
        />
      </DataTableLayout>

      <RecipeViewDialog
        recipe={activeRecipe}
        open={viewOpen}
        onOpenChange={setViewOpen}
      />

      <RecipeEditDialog
        recipe={activeRecipe}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSave={handleSaveRecipe}
      />
    </main>
  );
};

export default RecipesPage;
