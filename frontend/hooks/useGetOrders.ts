import { useQuery } from "@tanstack/react-query";
import { recipesQueryOptions } from "@/lib/catalogQueries";

export const useGetRecipes = () => {
  return useQuery(recipesQueryOptions());
};
