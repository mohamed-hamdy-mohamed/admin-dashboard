import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { languageInitScript } from "@/constants/language";
import { themeInitScript } from "@/constants/theme";
import { getLocaleDirection, normalizeLocale } from "@/lib/i18n";
import { LOCALE_COOKIE } from "@/util/localeStorage";
import { Locale } from "@/types/i18n";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value) as Locale;

  return {
    title: locale === "ar" ? "منصة عمليات الإدارة" : "Admin Operations Platform",
    description: locale === "ar" ? "منصة عمليات الإدارة" : "Admin Operations Platform",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/favicon-rounded.svg", type: "image/svg+xml" },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const direction = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        suppressHydrationWarning
        className="h-full min-h-svh bg-background antialiased"
      >
        <Script id="language-init" strategy="beforeInteractive">
          {languageInitScript}
        </Script>
        <Providers initialLocale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
