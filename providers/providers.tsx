"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import ThemeSync from "@/components/ThemeSync";
import { ThemeProvider } from "@/providers/ThemeProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider disableTransitionOnChange>
        <ThemeSync />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};
