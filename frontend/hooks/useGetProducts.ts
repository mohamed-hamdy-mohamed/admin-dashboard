import { ProductsResponse } from "@/types/products";
import { useDummyJsonQuery } from "@/hooks/useDummyJsonQuery";

export const useGetProducts = () => {
  return useDummyJsonQuery<ProductsResponse>("products", "/products");
};
