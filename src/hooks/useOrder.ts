import { create } from "zustand";
import type { Order, OrderStatus } from "../types/order";

type OrderStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;
};

export const useOrderStore = create<OrderStore>()((set) => ({
  orders: [
    {
      id: "1",
      customer: "abc",
      product: "Strawberry Truffle Delight",
      quantity: 1,
      status: "Pending",
    },
    {
      id: "2",
      customer: "abc",
      product: "Choco Chip Cupcake",
      quantity: 6,
      status: "Completed",
    },
    {
      id: "3",
      customer: "abc",
      product: "Glazed Donut",
      quantity: 12,
      status: "Pending",
    },
  ],

  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),

  updateStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, status } : order,
      ),
    })),

  deleteOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    })),
}));