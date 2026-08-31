"use client";

import { memo, useMemo } from "react";
import { ProductsResponse } from "@/types/products";
import { Package, TriangleAlert, Tags, Star } from "lucide-react";
import StatsCard from "../../shared/atoms/StatsCard";
import { Stats } from "@/types/stats";
import { useTranslation } from "@/providers/LanguageProvider";
import { formatNumber, formatDecimal } from "@/util/formatNumber";

export interface ProductsStatsProps {
  data: ProductsResponse;
}

const ProductsStats = ({ data }: ProductsStatsProps) => {
  const { locale, t } = useTranslation();

  const productStats = useMemo<Stats[]>(() => {
    const products = data.products;
    const totalProducts = products.length;
    let lowStockCount = 0;
    let ratingTotal = 0;
    const categories = new Set<string>();

    for (const product of products) {
      if (product.availabilityStatus === "Low Stock") {
        lowStockCount += 1;
      }
      ratingTotal += product.rating;
      categories.add(product.category);
    }

    const averageRating = totalProducts > 0 ? ratingTotal / totalProducts : 0;

    return [
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
        value: formatNumber(lowStockCount, locale),
        description: t("products.stats.lowStockProducts.description"),
        icon: TriangleAlert,
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
      },
      {
        title: t("products.stats.uniqueCategories.title"),
        value: formatNumber(categories.size, locale),
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
    ];
  }, [data.products, locale, t]);

  return <StatsCard stats={productStats} />;
};

export default memo(ProductsStats);
