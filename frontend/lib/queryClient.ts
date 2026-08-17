import { isServer, QueryClient } from "@tanstack/react-query";

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    },
  },
};

export const createQueryClient = () => new QueryClient(queryClientConfig);

let browserQueryClient: QueryClient | undefined;

export const getQueryClient = () => {
  if (isServer) {
    return createQueryClient();
  }

  browserQueryClient ??= createQueryClient();

  return browserQueryClient;
};
