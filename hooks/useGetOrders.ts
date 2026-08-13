import { apiClient } from "@/lib/apiClient";
import { RecipesResponse } from "@/types/recipes";

import { useQuery } from "@tanstack/react-query";

export const useGetRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: async (): Promise<RecipesResponse> => {
      const { data } = await apiClient.get<RecipesResponse>("/recipes", {
        params: { limit: 200, skip: 0 },
      });
      return data;
    },
  });
};
