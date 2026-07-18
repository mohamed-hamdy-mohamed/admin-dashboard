export interface OrderDistributionChartTypes {
  name: string;
  value?: number;
  color: string;
}

export const orderDistribution: OrderDistributionChartTypes[] = [
  { name: "Pending", value: 24, color: "#fbc02d" },
  { name: "Processing", value: 18, color: "#03a9fa" },
  { name: "Cancelled", value: 12, color: "#ef4444" },
  { name: "Delivered", value: 46, color: "#8bc34a" },
];
