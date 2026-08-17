"use client";

import dynamic from "next/dynamic";
import RecipesStats from "./RecipesStats";
import RecipesTable from "./RecipesTable";
import { useGetRecipes } from "@/hooks/useGetOrders";
import { useCatalogEntityPage } from "@/hooks/useCatalogEntityPage";
import CatalogPageTemplate from "@/components/templates/CatalogPageTemplate";
import { Recipe } from "@/types/recipes";
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
  const {
    search,
    setSearch,
    paginatedData,
    currentPage,
    totalPages,
    prevPage,
    nextPage,
    goToPage,
    mergedData,
    activeItem: activeRecipe,
    viewOpen,
    setViewOpen,
    editOpen,
    setEditOpen,
    openView,
    openEdit,
    handleSave,
  } = useCatalogEntityPage({
    data,
    collectionKey: "recipes",
    match: matchRecipe,
    load: loadRecipeEdits,
    persist: persistRecipeEdits,
    apply: applyRecipeEdits,
  });

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
            onSave={handleSave}
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
