"use client";

import { ThemeProvider } from "@/providers/ThemeProvider";
import dynamic from "next/dynamic";
import LanguageSync from "@/components/LanguageSync";
import ThemeSync from "@/components/ThemeSync";
import {
  THEME_DEFAULT,
  THEME_STORAGE_KEY,
} from "@/constants/theme";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import { Locale } from "@/types/i18n";

const AppToaster = dynamic(() => import("@/components/atoms/ui/AppToaster"), {
  ssr: false,
});

export const Providers = ({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) => {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme={THEME_DEFAULT}
        enableSystem
        storageKey={THEME_STORAGE_KEY}
        disableTransitionOnChange
      >
        <LanguageProvider initialLocale={initialLocale}>
          <QueryProvider>
            <ThemeSync />
            <LanguageSync />
            <AppToaster />
            {children}
          </QueryProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
