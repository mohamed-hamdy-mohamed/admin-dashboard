import { apiClient } from "@/lib/apiClient";
import { RecipesResponse } from "@/types/recipes";

import { useQuery } from "@tanstack/react-query";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: async (): Promise<RecipesResponse> => {
      const { data } = await apiClient.get("/recipes");
      return data;
    },
  });
};
