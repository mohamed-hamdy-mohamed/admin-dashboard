"use client";

import { useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import RecipesStats from "./RecipesStats";
import RecipesTable from "./RecipesTable";
import { useGetRecipes } from "@/hooks/useGetOrders";
import { useCatalogCollection } from "@/hooks/useCatalogCollection";
import { useEntityDialog } from "@/hooks/useEntityDialog";
import { usePersistedEdits } from "@/hooks/usePersistedEdits";
import CatalogPageTemplate from "@/components/templates/CatalogPageTemplate";
import { Recipe } from "@/types/recipes";
import { RecipeEditValues } from "@/types/recipe-edits";
import {
  applyRecipeEdits,
  loadRecipeEdits,
  persistRecipeEdits,
} from "@/util/recipeEdits";
import { useTranslation } from "@/providers/LanguageProvider";

const RecipeViewDialog = dynamic(() => import("./RecipeViewDialog"), {
  ssr: false,
});

const RecipeEditDialog = dynamic(() => import("./RecipeEditDialog"), {
  ssr: false,
});

const matchRecipe = (recipe: Recipe, query: string) =>
  recipe.name.toLowerCase().includes(query) ||
  recipe.cuisine.toLowerCase().includes(query);

const RecipesPage = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetRecipes();
  const { mergedItems: recipes, saveEdit } = usePersistedEdits({
    items: data?.recipes,
    load: loadRecipeEdits,
    persist: persistRecipeEdits,
    apply: applyRecipeEdits,
  });
  const {
    item: activeRecipe,
    setItem: setActiveRecipe,
    viewOpen,
    setViewOpen,
    editOpen,
    setEditOpen,
    openView,
    openEdit,
  } = useEntityDialog<Recipe>();
  const {
    search,
    setSearch,
    paginatedData,
    currentPage,
    totalPages,
    prevPage,
    nextPage,
    goToPage,
  } = useCatalogCollection({
    items: recipes,
    match: matchRecipe,
  });

  const mergedData = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return {
      ...data,
      recipes,
    };
  }, [data, recipes]);

  const handleSaveRecipe = useCallback(
    (values: RecipeEditValues) => {
      if (!activeRecipe) {
        return;
      }

      setActiveRecipe(saveEdit(activeRecipe, values));
      setEditOpen(false);
    },
    [activeRecipe, saveEdit, setActiveRecipe, setEditOpen],
  );

  return (
    <CatalogPageTemplate
      isLoading={isLoading}
      header={mergedData && <RecipesStats data={mergedData} />}
      title={t("recipes.listTitle")}
      description={t("recipes.listDescription")}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder={t("recipes.searchPlaceholder")}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={goToPage}
      onPrevious={prevPage}
      onNext={nextPage}
      footer={
        <>
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
        </>
      }
    >
      <RecipesTable
        isLoading={isLoading}
        recipes={paginatedData}
        onViewRecipe={openView}
        onEditRecipe={openEdit}
      />
    </CatalogPageTemplate>
  );
};

export default RecipesPage;
