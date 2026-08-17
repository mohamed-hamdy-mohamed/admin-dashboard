import { salesData } from "@/constants/sales-data";
import { SalesResponse } from "@/types/sales";

export const useGetSales = (): {
  data: SalesResponse;
  isLoading: false;
  isError: false;
} => {
  return {
    data: salesData,
    isLoading: false,
    isError: false,
  };
};
