export interface ProductPerformanceType {
  name: string;
  retention: number;
  revenue: number;
  profit: number;
}

export const productPerformance: ProductPerformanceType[] = [
  {
    name: "Smartphone",
    retention: 5200,
    revenue: 3100,
    profit: 2800,
  },
  {
    name: "Laptop",
    retention: 4300,
    revenue: 2700,
    profit: 3400,
  },
  {
    name: "Coffee Table",
    retention: 3100,
    revenue: 6900,
    profit: 4100,
  },
  {
    name: "Mouse",
    retention: 2500,
    revenue: 4200,
    profit: 2700,
  },
  {
    name: "Running Shoes",
    retention: 2000,
    revenue: 9100,
    profit: 2900,
  },
];
