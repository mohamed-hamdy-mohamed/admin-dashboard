import { salesData } from "@/constants/sales-data";
import { useQuery } from "@tanstack/react-query";

export const useGetSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 700));

      return salesData;
    },
  });
};
