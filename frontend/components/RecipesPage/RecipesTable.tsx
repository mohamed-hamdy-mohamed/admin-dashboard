"use client";

import { TableHead } from "@/components/atoms/ui/table";
import CatalogTable from "@/components/molecules/CatalogTable";
import { Recipe } from "@/types/recipes";
import RecipesTableRow from "./RecipesTableRow";
import { useTranslation } from "@/providers/LanguageProvider";

interface RecipesTableProps {
  recipes: Recipe[];
  onViewRecipe: (recipe: Recipe) => void;
  onEditRecipe: (recipe: Recipe) => void;
}

const RecipesTable = ({
  recipes,
  onViewRecipe,
  onEditRecipe,
}: RecipesTableProps) => {
  const { t } = useTranslation();

  return (
    <CatalogTable
      colSpan={8}
      emptyMessage={t("recipes.empty")}
      isEmpty={recipes.length === 0}
      columns={
        <>
          <TableHead className="w-[320px]">{t("recipes.table.recipe")}</TableHead>
          <TableHead>{t("recipes.table.cuisine")}</TableHead>
          <TableHead>{t("recipes.table.difficulty")}</TableHead>
          <TableHead>{t("recipes.table.rating")}</TableHead>
          <TableHead>{t("recipes.table.reviews")}</TableHead>
          <TableHead>{t("recipes.table.servings")}</TableHead>
          <TableHead>{t("recipes.table.calories")}</TableHead>
          <TableHead className="text-end">{t("recipes.table.actions")}</TableHead>
        </>
      }
    >
      {recipes.map((recipe) => (
        <RecipesTableRow
          key={recipe.id}
          recipe={recipe}
          onView={onViewRecipe}
          onEdit={onEditRecipe}
        />
      ))}
    </CatalogTable>
  );
};

export default RecipesTable;
