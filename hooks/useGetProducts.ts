import { apiClient } from "@/lib/apiClient";
import { ProductsResponse } from "@/types/products";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<ProductsResponse> => {
      const { data } = await apiClient.get("/products");
      return data;
    },
  });
};
