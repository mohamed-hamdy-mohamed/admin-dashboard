import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

export const useDummyJsonQuery = <T,>(queryKey: string, path: string) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: async (): Promise<T> => {
      const { data } = await apiClient.get<T>(path, {
        params: { limit: 200, skip: 0 },
      });
      return data;
    },
  });
};
