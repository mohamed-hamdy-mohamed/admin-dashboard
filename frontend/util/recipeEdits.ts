import { Recipe } from "@/types/recipes";
import { RecipeEditValues } from "@/types/recipe-edits";

export const RECIPE_EDITS_STORAGE_KEY = "admin-dashboard-recipe-edits";

export type RecipeEditsMap = Record<number, RecipeEditValues>;

export const loadRecipeEdits = (): RecipeEditsMap => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = localStorage.getItem(RECIPE_EDITS_STORAGE_KEY);
    if (!stored) {
      return {};
    }

    return JSON.parse(stored) as RecipeEditsMap;
  } catch {
    return {};
  }
};

export const persistRecipeEdits = (edits: RecipeEditsMap): void => {
  localStorage.setItem(RECIPE_EDITS_STORAGE_KEY, JSON.stringify(edits));
};

export const applyRecipeEdits = (
  recipes: Recipe[],
  edits: RecipeEditsMap,
): Recipe[] => {
  return recipes.map((recipe) => {
    const edit = edits[recipe.id];
    if (!edit) {
      return recipe;
    }

    return {
      ...recipe,
      name: edit.name,
      cuisine: edit.cuisine,
      difficulty: edit.difficulty,
    };
  });
};
