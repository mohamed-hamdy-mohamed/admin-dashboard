export interface CategoryChartTypes {
  name: string;
  value?: number;
  color: string;
}

export const categoryChart: CategoryChartTypes[] = [
  { name: "Smartphones", value: 30, color: "#ef4444" },
  { name: "Laptops", value: 25, color: "#2563eb" },
  { name: "Furniture", value: 18, color: "#f59e0b" },
  { name: "Beauty & Personal Care", value: 15, color: "#10b981" },
  { name: "Gaming Accessories", value: 12, color: "#8b5cf6" },
];
