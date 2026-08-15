"use client";

import { Recipe } from "@/types/recipes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/ui/avatar";
import RecipeDifficultyBadge from "./RecipeDifficultyBadge";
import DetailItem from "@/components/atoms/ui/DetailItem";
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" closeLabel={t("common.close")}>
        {recipe && (
          <>
            <DialogHeader>
              <DialogTitle>{t("recipes.dialogs.view.title")}</DialogTitle>
              <DialogDescription>
                {t("recipes.dialogs.view.description")}
              </DialogDescription>
            </DialogHeader>

            <div className="flex min-w-0 items-center gap-4">
              <Avatar className="h-16 w-16 rounded-lg">
                <AvatarImage src={recipe.image} alt={recipe.name} sizes="64px" />
                <AvatarFallback>{recipe.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <div>
                  <p className="text-lg font-semibold">{recipe.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {recipe.cuisine}
                  </p>
                </div>
                <RecipeDifficultyBadge difficulty={recipe.difficulty} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RecipeViewDialog;
