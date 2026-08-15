"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import LanguageSync from "@/components/LanguageSync";
import BlockingInitScripts from "@/components/BlockingInitScripts";
import ThemeSync from "@/components/ThemeSync";
import {
  THEME_DEFAULT,
  THEME_STORAGE_KEY,
} from "@/constants/theme";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import AppToaster from "@/components/ui/AppToaster";
import { Locale } from "@/types/i18n";

export const Providers = ({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) => {
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
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme={THEME_DEFAULT}
          enableSystem
          storageKey={THEME_STORAGE_KEY}
          disableTransitionOnChange
        >
          <BlockingInitScripts />
          <LanguageProvider initialLocale={initialLocale}>
            <ThemeSync />
            <LanguageSync />
            <AppToaster />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
