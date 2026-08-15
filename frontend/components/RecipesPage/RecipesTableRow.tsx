"use client";

import { TableCell, TableRow } from "@/components/atoms/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/ui/avatar";

import { Badge } from "@/components/atoms/ui/badge";

import { Eye, Pencil, Star } from "lucide-react";
import { Recipe } from "@/types/recipes";
import RowActions from "../atoms/ui/RowActions";
import RecipeDifficultyBadge from "./RecipeDifficultyBadge";
import { useTranslation } from "@/providers/LanguageProvider";
import { formatDecimal, formatNumber } from "@/util/formatNumber";

interface RecipesTableRowProps {
  recipe: Recipe;
  onView: (recipe: Recipe) => void;
  onEdit: (recipe: Recipe) => void;
}

const RecipesTableRow = ({ recipe, onView, onEdit }: RecipesTableRowProps) => {
  const { locale, t } = useTranslation();

  return (
    <TableRow className="transition-colors hover:bg-muted/40">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 rounded-lg">
            <AvatarImage src={recipe.image} alt={recipe.name} sizes="48px" />

            <AvatarFallback>{recipe.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <p className="font-semibold">{recipe.name}</p>

            <p className="text-xs text-muted-foreground">
              {recipe.mealType.join(", ")}
            </p>
          </div>
        </div>
      </TableCell>

      <TableCell>{recipe.cuisine}</TableCell>

      <TableCell>
        <RecipeDifficultyBadge difficulty={recipe.difficulty} />
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

          {formatDecimal(recipe.rating, locale, 1)}
        </div>
      </TableCell>

      <TableCell>{formatNumber(recipe.reviewCount, locale)}</TableCell>

      <TableCell>
        <Badge variant="outline">{formatNumber(recipe.servings, locale)}</Badge>
      </TableCell>

      <TableCell>
        {t("recipes.dialogs.view.caloriesValue", {
          value: recipe.caloriesPerServing,
        })}
      </TableCell>

      <TableCell className="text-end">
        <RowActions
          ariaLabel={t("rowActions.recipe")}
          actions={[
            {
              label: t("rowActions.view"),
              icon: Eye,
              onClick: () => onView(recipe),
            },
            {
              label: t("rowActions.edit"),
              icon: Pencil,
              onClick: () => onEdit(recipe),
            },
          ]}
        />
      </TableCell>
    </TableRow>
  );
};

export default RecipesTableRow;
