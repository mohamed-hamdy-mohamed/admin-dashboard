import { useQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "@/lib/catalogQueries";

export const useGetProducts = () => {
  return useQuery(productsQueryOptions());
};
