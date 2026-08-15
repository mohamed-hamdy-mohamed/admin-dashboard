import { Locale } from "@/types/i18n";
import {
  formatDecimal,
  formatNumber,
  formatPercent,
} from "@/util/formatNumber";
import { formatPrice } from "@/util/formatPrice";

export function createChartTickFormatter(locale: Locale) {
  return (value: number) => formatNumber(value, locale);
}

export function createChartPercentLabel(
  locale: Locale,
  name: string,
  percent: number,
) {
  return `${name} ${formatPercent(percent * 100, locale)}`;
}

export function createChartTooltipPercentFormatter(locale: Locale) {
  return (value: unknown, name: unknown) => [
    formatPercent(Number(value ?? 0), locale),
    String(name ?? ""),
  ];
}

export function createChartTooltipNumberFormatter(locale: Locale) {
  return (value: unknown, name: unknown) => [
    formatNumber(Number(value ?? 0), locale),
    String(name ?? ""),
  ];
}

export function createChartTooltipPriceFormatter(locale: Locale) {
  return (value: unknown, name: unknown) => [
    formatPrice(Number(value ?? 0), locale),
    String(name ?? ""),
  ];
}

export function createChartPieLabelFormatter(locale: Locale) {
  return ({
    name,
    percent,
  }: {
    name?: string;
    percent?: number;
  }) => createChartPercentLabel(locale, name ?? "", percent ?? 0);
}

export { formatDecimal, formatNumber, formatPercent };
