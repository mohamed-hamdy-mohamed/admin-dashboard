import { salesData } from "@/constants/sales-data";
import { SalesResponse } from "@/types/sales";
import { useQuery } from "@tanstack/react-query";

export const useGetSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: async (): Promise<SalesResponse> => {
      await new Promise((resolve) => setTimeout(resolve, 700));
      return salesData;
    },
  });
};
