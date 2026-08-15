import { ar } from "@/locales/ar";
import { en } from "@/locales/en";
import { Locale } from "@/types/i18n";
import {
  formatTranslationParam,
  localizeDigitsInString,
} from "@/util/formatLocale";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  ar: ar as unknown as Dictionary,
};

export type Dictionary = typeof en;
export type TranslationKey = Paths<Dictionary>;

type Paths<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends string
    ? `${Prefix}${K}`
    : T[K] extends readonly string[]
      ? `${Prefix}${K}`
      : Paths<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

function resolvePath(dictionary: Dictionary, key: string): string | undefined {
  const value = key.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object" && part in current) {
      return (current as Record<string, unknown>)[part];
    }

    return undefined;
  }, dictionary);

  return typeof value === "string" ? value : undefined;
}

export function translate(
  locale: Locale,
  key: TranslationKey,
  params?: Record<string, string | number>,
): string {
  const dictionary = dictionaries[locale];
  const fallback = dictionaries.en;
  const template = resolvePath(dictionary, key) ?? resolvePath(fallback, key) ?? key;

  if (!params) {
    return localizeDigitsInString(template, locale);
  }

  const formatted = Object.entries(params).reduce(
    (result, [paramKey, paramValue]) =>
      result.replaceAll(
        `{${paramKey}}`,
        formatTranslationParam(paramValue, locale),
      ),
    template,
  );

  return localizeDigitsInString(formatted, locale);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getLocaleDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function normalizeLocale(value?: string | null): Locale {
  return value === "ar" ? "ar" : "en";
}
