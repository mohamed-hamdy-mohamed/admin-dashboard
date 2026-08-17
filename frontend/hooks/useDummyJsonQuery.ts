import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

interface DummyJsonQueryOptions {
  select?: string;
}

export const useDummyJsonQuery = <T,>(
  queryKey: string,
  path: string,
  options?: DummyJsonQueryOptions,
) => {
  return useQuery({
    queryKey: options?.select ? [queryKey, options.select] : [queryKey],
    queryFn: async (): Promise<T> => {
      const { data } = await apiClient.get<T>(path, {
        params: {
          limit: 200,
          skip: 0,
          ...(options?.select ? { select: options.select } : {}),
        },
      });

      return data;
    },
  });
};
