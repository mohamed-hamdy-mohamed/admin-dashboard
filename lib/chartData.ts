import { getDictionary } from "@/lib/i18n";
import { Locale } from "@/types/i18n";
import {
  categoryChart as categoryColors,
  orderDistribution as orderColors,
  productPerformance as productPerformanceBase,
  salesDataChart as salesDataBase,
} from "@/constants/analytics-charts";

export function getCategoryChart(locale: Locale) {
  const { charts } = getDictionary(locale);

  return [
    { name: charts.categories.pizza, value: 35, color: categoryColors[0].color },
    { name: charts.categories.burger, value: 24, color: categoryColors[1].color },
    { name: charts.categories.pasta, value: 18, color: categoryColors[2].color },
    { name: charts.categories.dessert, value: 13, color: categoryColors[3].color },
    { name: charts.categories.drinks, value: 10, color: categoryColors[4].color },
  ];
}

export function getOrderDistributionChart(locale: Locale) {
  const { charts } = getDictionary(locale);

  return [
    { name: charts.orderStatuses.delivered, value: 48, color: orderColors[0].color },
    { name: charts.orderStatuses.preparing, value: 22, color: orderColors[1].color },
    { name: charts.orderStatuses.pending, value: 18, color: orderColors[2].color },
    { name: charts.orderStatuses.cancelled, value: 12, color: orderColors[3].color },
  ];
}

export function getProductPerformanceChart(locale: Locale) {
  const { charts } = getDictionary(locale);
  const names = [
    charts.products.margherita,
    charts.products.burger,
    charts.products.alfredo,
    charts.products.pepperoni,
    charts.products.chocolate,
  ];

  return productPerformanceBase.map((item, index) => ({
    ...item,
    name: names[index] ?? item.name,
  }));
}

export function getSalesDataChart(locale: Locale) {
  const { charts } = getDictionary(locale);
  const months = [
    charts.months.jan,
    charts.months.feb,
    charts.months.mar,
    charts.months.apr,
    charts.months.may,
    charts.months.jun,
    charts.months.jul,
  ];

  return salesDataBase.map((item, index) => ({
    ...item,
    month: months[index] ?? item.month,
  }));
}
