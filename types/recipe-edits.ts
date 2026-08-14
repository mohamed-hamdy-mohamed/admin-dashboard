import { Recipe } from "@/types/recipes";

export interface RecipeEditValues {
  name: string;
  cuisine: string;
  difficulty: Recipe["difficulty"];
}
