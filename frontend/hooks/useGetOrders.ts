import { RecipesResponse } from "@/types/recipes";
import { useDummyJsonQuery } from "@/hooks/useDummyJsonQuery";

export const useGetRecipes = () => {
  return useDummyJsonQuery<RecipesResponse>("recipes", "/recipes");
};
