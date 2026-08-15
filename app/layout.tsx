import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { getLocaleDirection, normalizeLocale } from "@/lib/i18n";
import { LOCALE_COOKIE } from "@/util/localeStorage";
import { Locale } from "@/types/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value) as Locale;

  return {
    title: locale === "ar" ? "لوحة تحكم المسؤول" : "Admin Dashboard",
    description: locale === "ar" ? "لوحة تحكم المسؤول" : "Admin Dashboard",
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
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-svh bg-background antialiased">
        <Providers initialLocale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
