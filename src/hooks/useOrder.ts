import { create } from "zustand";
import type { Order, OrderStatus } from "../types/order";

/**
 * It holds the orders list and the actions that change it
 */
type OrderStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;
};

/**
 * Zustand for all orders
 * Any component can read orders from here without props
 * Used on the Orders page
 */

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

  /** Makes a new array with all old orders and the new order at the end */
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),

  /** Finds the order with the same id and changes only its status */
  updateStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, status } : order,
      ),
    })),

  /** Keeps every order except the one with this id */
  deleteOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    })),
}));