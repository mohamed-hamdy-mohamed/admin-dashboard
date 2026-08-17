import { RecipesResponse } from "@/types/recipes";
import { useDummyJsonQuery } from "@/hooks/useDummyJsonQuery";

const RECIPES_SELECT =
  "id,name,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,tags,image,rating,reviewCount,mealType";

export const useGetRecipes = () => {
  return useDummyJsonQuery<RecipesResponse>("recipes", "/recipes", {
    select: RECIPES_SELECT,
  });
};
