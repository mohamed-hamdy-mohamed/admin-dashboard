"use client";

import { useMemo } from "react";
import { Receipt, Clock3, DollarSign, Star } from "lucide-react";

import StatsCard from "../atoms/ui/StatsCard";
import { RecipesResponse } from "@/types/recipes";
import { Stats } from "@/types/stats";
import { useTranslation } from "@/providers/LanguageProvider";
import { formatDecimal, formatNumber } from "@/util/formatNumber";

interface RecipesStatsProps {
  data: RecipesResponse;
}

const RecipesStats = ({ data }: RecipesStatsProps) => {
  const { locale, t } = useTranslation();
  const recipes = data.recipes;
  const totalRecipes = recipes.length;

  const easyRecipes = recipes.filter(
    (recipe) => recipe.difficulty === "Easy",
  ).length;

  const averageRating =
    totalRecipes > 0
      ? recipes.reduce((sum, recipe) => sum + recipe.rating, 0) / totalRecipes
      : 0;

  const totalReviews = recipes.reduce(
    (sum, recipe) => sum + recipe.reviewCount,
    0,
  );

  const stats = useMemo<Stats[]>(
    () => [
      {
        title: t("recipes.stats.totalRecipes.title"),
        value: formatNumber(totalRecipes, locale),
        description: t("recipes.stats.totalRecipes.description"),
        icon: Receipt,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        title: t("recipes.stats.easyRecipes.title"),
        value: formatNumber(easyRecipes, locale),
        description: t("recipes.stats.easyRecipes.description"),
        icon: Clock3,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
      },
      {
        title: t("recipes.stats.totalReviews.title"),
        value: formatNumber(totalReviews, locale),
        description: t("recipes.stats.totalReviews.description"),
        icon: DollarSign,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
      },
      {
        title: t("recipes.stats.averageRating.title"),
        value: formatDecimal(averageRating, locale, 1),
        description: t("recipes.stats.averageRating.description"),
        icon: Star,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-600",
      },
    ],
    [averageRating, easyRecipes, locale, t, totalRecipes, totalReviews],
  );

  return <StatsCard stats={stats} />;
};

export default RecipesStats;
