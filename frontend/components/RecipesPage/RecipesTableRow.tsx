"use client";

import { memo } from "react";
import { TableCell, TableRow } from "@/components/atoms/ui/table";
import { Badge } from "@/components/atoms/ui/badge";
import { Star } from "lucide-react";
import { Recipe } from "@/types/recipes";
import EntityIdentity from "@/components/molecules/EntityIdentity";
import ViewEditRowActions from "@/components/molecules/ViewEditRowActions";
import RecipeDifficultyBadge from "./RecipeDifficultyBadge";
import { useTranslation } from "@/providers/LanguageProvider";
import { formatDecimal, formatNumber } from "@/util/formatNumber";

interface RecipesTableRowProps {
  recipe: Recipe;
  priority?: boolean;
  onView: (recipe: Recipe) => void;
  onEdit: (recipe: Recipe) => void;
}

const RecipesTableRow = ({
  recipe,
  priority = false,
  onView,
  onEdit,
}: RecipesTableRowProps) => {
  const { locale, t } = useTranslation();

  return (
    <TableRow className="transition-colors hover:bg-muted/40">
      <TableCell>
        <EntityIdentity
          src={recipe.image}
          alt={recipe.name}
          fallback={recipe.name.charAt(0)}
          title={recipe.name}
          subtitle={recipe.mealType.join(", ")}
          avatarClassName="h-12 w-12 rounded-lg"
          contentClassName="space-y-1"
          sizes="48px"
          priority={priority}
        />
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
        <ViewEditRowActions
          item={recipe}
          ariaLabel={t("rowActions.recipe")}
          viewLabel={t("rowActions.view")}
          editLabel={t("rowActions.edit")}
          onView={onView}
          onEdit={onEdit}
        />
      </TableCell>
    </TableRow>
  );
};

export default memo(RecipesTableRow);
