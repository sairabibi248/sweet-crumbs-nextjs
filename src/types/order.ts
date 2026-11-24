export type OrderStatus = "Pending" | "Completed" | "Cancelled";

export type Order = {
  id: string;
  customer: string;
  product: string;
  quantity: number;
  status: OrderStatus;
};