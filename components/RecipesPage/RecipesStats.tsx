"use client";

import { Receipt, Clock3, DollarSign, Star } from "lucide-react";

import StatsCard from "../ui/StatsCard";
import { RecipesResponse } from "@/types/recipes";
import { Stats } from "@/types/stats";

interface RecipesStatsProps {
  data: RecipesResponse;
}

const RecipesStats = ({ data }: RecipesStatsProps) => {
  const recipes = data.recipes;
  const totalRecipes = recipes.length;

  const easyRecipes = recipes.filter(
    (recipe) => recipe.difficulty === "Easy",
  ).length;

  const averageRating = (
    recipes.reduce((sum, recipe) => sum + recipe.rating, 0) / totalRecipes
  ).toFixed(1);

  const totalReviews = recipes.reduce(
    (sum, recipe) => sum + recipe.reviewCount,
    0,
  );
  const stats: Stats[] = [
    {
      title: "Total Recipes",
      value: totalRecipes,
      description: "Recipes available",
      icon: Receipt,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Easy Recipes",
      value: easyRecipes,
      description: "Recipes with easy difficulty",
      icon: Clock3,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      title: "Total Reviews",
      value: totalReviews,
      description: "Total reviews received",
      icon: DollarSign,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Average Rating",
      value: averageRating,
      description: "Customer satisfaction",
      icon: Star,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  return <StatsCard stats={stats} />;
};

export default RecipesStats;
