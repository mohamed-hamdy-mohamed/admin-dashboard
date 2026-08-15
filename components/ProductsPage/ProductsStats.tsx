"use client";

import { useMemo } from "react";
import { ProductsResponse } from "@/types/products";
import { Package, TriangleAlert, Tags, Star } from "lucide-react";
import StatsCard from "../ui/StatsCard";
import { Stats } from "@/types/stats";
import { useTranslation } from "@/providers/LanguageProvider";
import { formatNumber, formatDecimal } from "@/util/formatNumber";

export interface ProductsStatsProps {
  data: ProductsResponse;
}

const ProductsStats = ({ data }: ProductsStatsProps) => {
  const { locale, t } = useTranslation();
  const totalProducts = data?.products.length ?? 0;

  const stockProducts = data.products.filter(
    (product) => product.availabilityStatus === "Low Stock",
  ).length;

  const categoryProducts = new Set(
    data.products.map((product) => product.category),
  ).size;

  const averageRating =
    totalProducts > 0
      ? data.products.reduce((acc, product) => acc + product.rating, 0) /
        totalProducts
      : 0;

  const productStats = useMemo<Stats[]>(
    () => [
      {
        title: t("products.stats.totalProducts.title"),
        value: formatNumber(totalProducts, locale),
        description: t("products.stats.totalProducts.description"),
        icon: Package,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
      },
      {
        title: t("products.stats.lowStockProducts.title"),
        value: formatNumber(stockProducts, locale),
        description: t("products.stats.lowStockProducts.description"),
        icon: TriangleAlert,
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
      },
      {
        title: t("products.stats.uniqueCategories.title"),
        value: formatNumber(categoryProducts, locale),
        description: t("products.stats.uniqueCategories.description"),
        icon: Tags,
        iconBg: "bg-sky-100",
        iconColor: "text-sky-600",
      },
      {
        title: t("products.stats.averageRating.title"),
        value: formatDecimal(averageRating, locale, 2),
        description: t("products.stats.averageRating.description"),
        icon: Star,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-600",
      },
    ],
    [averageRating, categoryProducts, locale, stockProducts, t, totalProducts],
  );

  return <StatsCard stats={productStats} />;
};

export default ProductsStats;
