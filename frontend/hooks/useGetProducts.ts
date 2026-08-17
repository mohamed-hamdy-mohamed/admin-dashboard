import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import type { ProductsResponse } from "@/types/products";

const PRODUCTS_SELECT =
  "id,title,category,price,rating,stock,availabilityStatus,brand,thumbnail";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products", PRODUCTS_SELECT],
    queryFn: async (): Promise<ProductsResponse> => {
      const { data } = await apiClient.get<ProductsResponse>("/products", {
        params: { limit: 200, skip: 0, select: PRODUCTS_SELECT },
      });

      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};
