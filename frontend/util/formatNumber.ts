import { Locale } from "@/types/i18n";
import { formatNumberValue } from "@/util/formatLocale";

export const formatNumber = (num: number, locale: Locale = "en") => {
  return formatNumberValue(num, locale);
};

export const formatDecimal = (
  num: number,
  locale: Locale = "en",
  fractionDigits = 1,
) => {
  return formatNumberValue(num, locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
};

export const formatPercent = (
  value: number,
  locale: Locale = "en",
  fractionDigits = 0,
) => {
  return formatNumberValue(value / 100, locale, {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
};
