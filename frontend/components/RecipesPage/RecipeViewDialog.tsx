"use client";

import { memo } from "react";
import { Recipe } from "@/types/recipes";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/atoms/dialog";
import DetailGrid from "@/shared/atoms/DetailGrid";
import DetailItem from "@/shared/atoms/DetailItem";
import EntityDialog from "@/shared/molecules/EntityDialog";
import EntityViewHeader from "@/shared/molecules/EntityViewHeader";
import RecipeDifficultyBadge from "./RecipeDifficultyBadge";
import { useTranslation } from "@/providers/LanguageProvider";
import { formatDisplayValue } from "@/util/formatLocale";

interface RecipeViewDialogProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RecipeViewDialog = ({
  recipe,
  open,
  onOpenChange,
}: RecipeViewDialogProps) => {
  const { locale, t } = useTranslation();

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      closeLabel={t("common.close")}
    >
      {recipe && (
        <>
          <DialogHeader>
            <DialogTitle>{t("recipes.dialogs.view.title")}</DialogTitle>
            <DialogDescription>
              {t("recipes.dialogs.view.description")}
            </DialogDescription>
          </DialogHeader>

          <EntityViewHeader
            src={recipe.image}
            alt={recipe.name}
            fallback={recipe.name.charAt(0)}
            title={recipe.name}
            subtitle={recipe.cuisine}
            avatarClassName="h-16 w-16 rounded-lg"
          >
            <RecipeDifficultyBadge difficulty={recipe.difficulty} />
          </EntityViewHeader>

          <DetailGrid>
            <DetailItem
              label={t("recipes.dialogs.view.rating")}
              value={formatDisplayValue(recipe.rating, locale)}
            />
            <DetailItem
              label={t("recipes.dialogs.view.reviews")}
              value={formatDisplayValue(recipe.reviewCount, locale)}
            />
            <DetailItem
              label={t("recipes.dialogs.view.servings")}
              value={formatDisplayValue(recipe.servings, locale)}
            />
            <DetailItem
              label={t("recipes.dialogs.view.calories")}
              value={formatDisplayValue(
                t("recipes.dialogs.view.caloriesValue", {
                  value: recipe.caloriesPerServing,
                }),
                locale,
              )}
            />
            <DetailItem
              label={t("recipes.dialogs.view.prepTime")}
              value={formatDisplayValue(
                t("recipes.dialogs.view.prepTimeValue", {
                  value: recipe.prepTimeMinutes,
                }),
                locale,
              )}
            />
            <DetailItem
              label={t("recipes.dialogs.view.cookTime")}
              value={formatDisplayValue(
                t("recipes.dialogs.view.cookTimeValue", {
                  value: recipe.cookTimeMinutes,
                }),
                locale,
              )}
            />
            <DetailItem
              label={t("recipes.dialogs.view.mealType")}
              value={formatDisplayValue(recipe.mealType.join(", "), locale)}
            />
            <DetailItem
              label={t("recipes.dialogs.view.tags")}
              value={formatDisplayValue(recipe.tags.join(", "), locale)}
            />
          </DetailGrid>
        </>
      )}
    </EntityDialog>
  );
};

export default memo(RecipeViewDialog);
