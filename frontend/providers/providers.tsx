"use client";

import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import LanguageSync from "@/components/LanguageSync";
import BlockingInitScripts from "@/components/BlockingInitScripts";
import ThemeSync from "@/components/ThemeSync";
import {
  THEME_DEFAULT,
  THEME_STORAGE_KEY,
} from "@/constants/theme";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { Locale } from "@/types/i18n";

const AppToaster = dynamic(() => import("@/components/ui/AppToaster"), {
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
        <BlockingInitScripts />
        <LanguageProvider initialLocale={initialLocale}>
          <ThemeSync />
          <LanguageSync />
          <AppToaster />
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
