"use client";

import { ProductsResponse } from "@/types/products";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Package, TriangleAlert, Tags, Star } from "lucide-react";
import StatsCard from "../ui/StatsCard";
import { Stats } from "@/types/stats";

export interface ProductsStatsProps {
  data: ProductsResponse;
}

const ProductsStats = ({ data }: ProductsStatsProps) => {
  const totalProducts = data?.products.length ?? 0;

  const stockProducts = data.products.filter(
    (product) => product.availabilityStatus === "Low Stock",
  ).length;

  const categoryProducts = new Set(
    data.products.map((product) => product.category),
  ).size;

  const averageRating = (
    data.products.reduce((acc, product) => acc + product.rating, 0) /
    totalProducts
  ).toFixed(2);

  const productStats: Stats[] = [
    {
      title: "Total Products",
      value: totalProducts,
      description: "Total number of products in the inventory.",
      icon: Package,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      title: "Low Stock Products",
      value: stockProducts,
      description: "Number of products that are low in stock.",
      icon: TriangleAlert,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Unique Categories",
      value: categoryProducts,
      description: "Number of unique product categories.",
      icon: Tags,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
    },
    {
      title: "Average Rating",
      value: averageRating,
      description: "Average rating of all products.",
      icon: Star,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  return <StatsCard stats={productStats} />;
};

export default ProductsStats;
