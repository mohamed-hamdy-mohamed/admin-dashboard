import { salesData } from "@/constants/sales-data";
import { SalesResponse } from "@/types/sales";
import { useQuery } from "@tanstack/react-query";

export const useGetSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: (): Promise<SalesResponse> => Promise.resolve(salesData),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
