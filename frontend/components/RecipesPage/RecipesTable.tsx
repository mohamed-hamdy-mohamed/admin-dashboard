"use client";

import { memo, useMemo } from "react";
import CatalogDataTable from "@/components/molecules/CatalogDataTable";
import { CATALOG_PRIORITY_ROWS } from "@/constants/catalog";
import { Recipe } from "@/types/recipes";
import RecipesTableRow from "./RecipesTableRow";
import { useTranslation } from "@/providers/LanguageProvider";

interface RecipesTableProps {
  recipes: Recipe[];
  isLoading?: boolean;
  onViewRecipe: (recipe: Recipe) => void;
  onEditRecipe: (recipe: Recipe) => void;
}

const RecipesTable = ({
  recipes,
  isLoading = false,
  onViewRecipe,
  onEditRecipe,
}: RecipesTableProps) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      { label: t("recipes.table.recipe"), className: "w-[320px]" },
      { label: t("recipes.table.cuisine") },
      { label: t("recipes.table.difficulty") },
      { label: t("recipes.table.rating") },
      { label: t("recipes.table.reviews") },
      { label: t("recipes.table.servings") },
      { label: t("recipes.table.calories") },
      { label: t("recipes.table.actions"), className: "text-end" },
    ],
    [t],
  );

  return (
    <CatalogDataTable
      columns={columns}
      emptyMessage={t("recipes.empty")}
      isLoading={isLoading}
      isEmpty={recipes.length === 0}
      skeletonLeading="avatar"
    >
      {recipes.map((recipe, index) => (
        <RecipesTableRow
          key={recipe.id}
          recipe={recipe}
          priority={index < CATALOG_PRIORITY_ROWS}
          onView={onViewRecipe}
          onEdit={onEditRecipe}
        />
      ))}
    </CatalogDataTable>
  );
};

export default memo(RecipesTable);
