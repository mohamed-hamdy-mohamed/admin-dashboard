import { apiClient } from "@/lib/apiClient";
import { ProductsResponse } from "@/types/products";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<ProductsResponse> => {
      const { data } = await apiClient.get<ProductsResponse>("/products", {
        params: { limit: 200, skip: 0 },
      });
      return data;
    },
  });
};
