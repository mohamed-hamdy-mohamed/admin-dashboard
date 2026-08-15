"use client";

import { Recipe } from "@/types/recipes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RecipeDifficultyBadge from "./RecipeDifficultyBadge";
import { useTranslation } from "@/providers/LanguageProvider";
import { Locale } from "@/types/i18n";
import { formatDisplayValue } from "@/util/formatLocale";

interface RecipeViewDialogProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DetailItem = ({
  label,
  value,
  locale,
}: {
  label: string;
  value: string | number;
  locale: Locale;
}) => {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">
        {formatDisplayValue(value, locale)}
      </p>
    </div>
  );
};

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
              <DetailItem label={t("recipes.dialogs.view.rating")} value={recipe.rating} locale={locale} />
              <DetailItem label={t("recipes.dialogs.view.reviews")} value={recipe.reviewCount} locale={locale} />
              <DetailItem label={t("recipes.dialogs.view.servings")} value={recipe.servings} locale={locale} />
              <DetailItem
                label={t("recipes.dialogs.view.calories")}
                value={t("recipes.dialogs.view.caloriesValue", {
                  value: recipe.caloriesPerServing,
                })}
                locale={locale}
              />
              <DetailItem
                label={t("recipes.dialogs.view.prepTime")}
                value={t("recipes.dialogs.view.prepTimeValue", {
                  value: recipe.prepTimeMinutes,
                })}
                locale={locale}
              />
              <DetailItem
                label={t("recipes.dialogs.view.cookTime")}
                value={t("recipes.dialogs.view.cookTimeValue", {
                  value: recipe.cookTimeMinutes,
                })}
                locale={locale}
              />
              <DetailItem label={t("recipes.dialogs.view.mealType")} value={recipe.mealType.join(", ")} locale={locale} />
              <DetailItem label={t("recipes.dialogs.view.tags")} value={recipe.tags.join(", ")} locale={locale} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RecipeViewDialog;
