export interface CategoryChartTypes {
  name: string;
  value: number;
  color: string;
}
export const categoryChart: CategoryChartTypes[] = [
  {
    name: "Pizza",
    value: 35,
    color: "#ef4444",
  },
  {
    name: "Burger",
    value: 24,
    color: "#f97316",
  },
  {
    name: "Pasta",
    value: 18,
    color: "#22c55e",
  },
  {
    name: "Dessert",
    value: 13,
    color: "#a855f7",
  },
  {
    name: "Drinks",
    value: 10,
    color: "#3b82f6",
  },
];

export interface OrderDistributionChartTypes {
  name: string;
  value: number;
  color: string;
}

export const orderDistribution: OrderDistributionChartTypes[] = [
  {
    name: "Delivered",
    value: 48,
    color: "#22c55e",
  },
  {
    name: "Preparing",
    value: 22,
    color: "#3b82f6",
  },
  {
    name: "Pending",
    value: 18,
    color: "#f59e0b",
  },
  {
    name: "Cancelled",
    value: 12,
    color: "#ef4444",
  },
];
export interface ProductPerformanceType {
  name: string;
  revenue: number;
  profit: number;
  orders: number;
}
export const productPerformance: ProductPerformanceType[] = [
  {
    name: "Margherita",
    orders: 620,
    profit: 6900,
    revenue: 14500,
  },
  {
    name: "Burger",
    orders: 580,
    profit: 6100,
    revenue: 13200,
  },
  {
    name: "Alfredo",
    orders: 510,
    profit: 5400,
    revenue: 11900,
  },
  {
    name: "Pepperoni",
    orders: 460,
    profit: 4900,
    revenue: 11000,
  },
  {
    name: "Chocolate",
    orders: 350,
    profit: 3600,
    revenue: 8500,
  },
];

export interface SalesDataChart {
  month: string;
  revenue: number;
}

export const salesDataChart: SalesDataChart[] = [
  {
    month: "Jan",
    revenue: 18500,
  },
  {
    month: "Feb",
    revenue: 21200,
  },
  {
    month: "Mar",
    revenue: 24800,
  },
  {
    month: "Apr",
    revenue: 23100,
  },
  {
    month: "May",
    revenue: 27400,
  },
  {
    month: "Jun",
    revenue: 29600,
  },
  {
    month: "Jul",
    revenue: 32800,
  },
];
