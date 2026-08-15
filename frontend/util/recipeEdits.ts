import { Recipe } from "@/types/recipes";
import { RecipeEditValues } from "@/types/recipe-edits";
import { applyIdEdits, loadJson, persistJson } from "@/util/localEdits";

export const RECIPE_EDITS_STORAGE_KEY = "admin-dashboard-recipe-edits";

export type RecipeEditsMap = Record<number, RecipeEditValues>;

export const loadRecipeEdits = (): RecipeEditsMap => {
  return loadJson<RecipeEditsMap>(RECIPE_EDITS_STORAGE_KEY, {});
};

export const persistRecipeEdits = (edits: RecipeEditsMap): void => {
  persistJson(RECIPE_EDITS_STORAGE_KEY, edits);
};

export const applyRecipeEdits = (
  recipes: Recipe[],
  edits: RecipeEditsMap,
): Recipe[] => {
  return applyIdEdits(recipes, edits, (recipe, edit) => ({
    ...recipe,
    name: edit.name,
    cuisine: edit.cuisine,
    difficulty: edit.difficulty,
  }));
};
