"use client";

import { memo, useCallback, useMemo } from "react";
import CatalogListTable from "@/components/molecules/CatalogListTable";
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

  const renderRow = useCallback(
    (recipe: Recipe, priority: boolean) => (
      <RecipesTableRow
        key={recipe.id}
        recipe={recipe}
        priority={priority}
        onView={onViewRecipe}
        onEdit={onEditRecipe}
      />
    ),
    [onEditRecipe, onViewRecipe],
  );

  return (
    <CatalogListTable
      items={recipes}
      isLoading={isLoading}
      columns={columns}
      emptyMessage={t("recipes.empty")}
      skeletonLeading="avatar"
      renderRow={renderRow}
    />
  );
};

export default memo(RecipesTable);
