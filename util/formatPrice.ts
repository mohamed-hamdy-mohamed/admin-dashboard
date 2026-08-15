import { Locale } from "@/types/i18n";
import { formatNumberValue } from "@/util/formatLocale";

export const formatPrice = (price: number, locale: Locale = "en") => {
  return formatNumberValue(price, locale, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
