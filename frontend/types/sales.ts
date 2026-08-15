export type SaleStatus = "Completed" | "Pending" | "Cancelled" | "Refunded";

export interface Sale {
  id: number;
  customer: string;
  email: string;
  avatar: string;
  product: string;
  category: string;
  amount: number;
  quantity: number;
  status: SaleStatus;
  paymentMethod: "Visa" | "MasterCard" | "PayPal" | "Cash";
  date: string;
}

export interface SalesResponse {
  sales: Sale[];
  total: number;
  skip: number;
  limit: number;
}
