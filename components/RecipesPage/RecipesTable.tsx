"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[320px]">{t("recipes.table.recipe")}</TableHead>
            <TableHead>{t("recipes.table.cuisine")}</TableHead>
            <TableHead>{t("recipes.table.difficulty")}</TableHead>
            <TableHead>{t("recipes.table.rating")}</TableHead>
            <TableHead>{t("recipes.table.reviews")}</TableHead>
            <TableHead>{t("recipes.table.servings")}</TableHead>
            <TableHead>{t("recipes.table.calories")}</TableHead>
            <TableHead className="text-end">{t("recipes.table.actions")}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipesTableRow
                key={recipe.id}
                recipe={recipe}
                onView={onViewRecipe}
                onEdit={onEditRecipe}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                {t("recipes.empty")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecipesTable;
