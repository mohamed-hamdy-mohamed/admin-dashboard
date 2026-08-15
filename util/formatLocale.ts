import { Locale } from "@/types/i18n";

const INTL_LOCALE: Record<Locale, string> = {
  en: "en-GB",
  ar: "ar-EG",
};

const NUMBERING_SYSTEM: Record<
  Locale,
  NonNullable<Intl.NumberFormatOptions["numberingSystem"]>
> = {
  en: "latn",
  ar: "arab",
};

const ARABIC_INDIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function getIntlLocale(locale: Locale): string {
  return INTL_LOCALE[locale];
}

export function getNumberFormatOptions(
  locale: Locale,
  options: Intl.NumberFormatOptions = {},
): Intl.NumberFormatOptions {
  return {
    numberingSystem: NUMBERING_SYSTEM[locale],
    ...options,
  };
}

export function getDateTimeFormatOptions(
  locale: Locale,
  options: Intl.DateTimeFormatOptions = {},
): Intl.DateTimeFormatOptions {
  return {
    numberingSystem: NUMBERING_SYSTEM[locale],
    ...options,
  };
}

export function localizeDigitsInString(text: string, locale: Locale): string {
  if (locale !== "ar") {
    return text;
  }

  return text.replace(/\d/g, (digit) => ARABIC_INDIC_DIGITS[Number(digit)] ?? digit);
}

export function formatNumberValue(
  value: number,
  locale: Locale,
  options: Intl.NumberFormatOptions = {},
): string {
  return new Intl.NumberFormat(
    getIntlLocale(locale),
    getNumberFormatOptions(locale, options),
  ).format(value);
}

export function formatDecimalValue(
  value: number,
  locale: Locale,
  fractionDigits = 1,
): string {
  return formatNumberValue(value, locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

export function formatPercentValue(
  value: number,
  locale: Locale,
  fractionDigits = 0,
): string {
  return formatNumberValue(value, locale, {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

export function formatDisplayValue(
  value: string | number,
  locale: Locale,
): string {
  if (typeof value === "number") {
    return Number.isInteger(value)
      ? formatNumberValue(value, locale)
      : formatDecimalValue(value, locale, 2);
  }

  return localizeDigitsInString(value, locale);
}

export function formatTranslationParam(
  value: string | number,
  locale: Locale,
): string {
  if (typeof value === "number") {
    return Number.isInteger(value)
      ? formatNumberValue(value, locale)
      : formatDecimalValue(value, locale, 2);
  }

  return localizeDigitsInString(value, locale);
}
