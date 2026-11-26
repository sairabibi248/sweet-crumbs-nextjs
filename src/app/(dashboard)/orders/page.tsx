"use client";

import { useState } from "react";
import { useOrderStore } from "@/hooks/useOrder";
import OrderForm from "@/components/orders/OrderForm";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import type { OrderStatus } from "@/types/order";
import type { OrderFormFields } from "@/schemas/orderSchema";

/**
 * Badge colors for each order status
 * Record makes sure every status has a color
 */
const statusColors: Record<OrderStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

/** Plain colors for dropdown options so they stay readable in light and dark mode */
const optionClass =
  "bg-white text-[#111827] dark:bg-[#1C1D21] dark:text-[#F4F4F5]";

/**
 * Orders page at the /orders URL
 * Shows all orders in a table with add and status change and delete
 * Orders come from the Zustand store in useOrder
 */
export default function OrdersPage() {
  /** Each selector reads only one value so the page re-renders only when that value changes */
  const orders = useOrderStore((state) => state.orders);
  const addOrder = useOrderStore((state) => state.addOrder);
  const updateStatus = useOrderStore((state) => state.updateStatus);
  const deleteOrder = useOrderStore((state) => state.deleteOrder);

  /** True when the Add Order form is open */
  const [isFormOpen, setIsFormOpen] = useState(false);

  /** Id of the order waiting for delete confirm and null when the dialog is closed */
  const [deleteId, setDeleteId] = useState<string | null>(null);

  /**
   * Adds a new order from the form data and closes the form
   * Date.now gives a unique id and every new order starts as Pending
   */
  const handleAdd = (data: OrderFormFields) => {
    addOrder({
      id: Date.now().toString(),
      ...data,
      status: "Pending",
    });
    setIsFormOpen(false);
  };

  /** Deletes the order after the user confirms and closes the dialog */
  const handleDelete = () => {
    if (deleteId) {
      deleteOrder(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 rounded-lg bg-[#C2416C] text-white cursor-pointer"
        >
          + Add Order
        </button>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-[#1C1D21] rounded-xl border border-gray-200 dark:border-[#2A2B30]">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200 dark:border-[#2A2B30]">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Product</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 dark:border-[#2A2B30] last:border-0"
              >
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.product}</td>
                <td className="p-4">{order.quantity}</td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value as OrderStatus)
                    }
                    className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer outline-none ${statusColors[order.status]}`}
                  >
                    <option value="Pending" className={optionClass}>
                      Pending
                    </option>
                    <option value="Completed" className={optionClass}>
                      Completed
                    </option>
                    <option value="Cancelled" className={optionClass}>
                      Cancelled
                    </option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => setDeleteId(order.id)}
                    className="px-5 py-1.5 rounded-md bg-[#CE4661] text-white text-sm font-semibold cursor-pointer hover:bg-[#B53A54]"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="p-6 text-center text-gray-500">No orders yet.</p>
        )}
      </div>

      {isFormOpen && (
        <OrderForm onSubmit={handleAdd} onClose={() => setIsFormOpen(false)} />
      )}

      {deleteId && (
        <ConfirmDialog
          title="Delete Order"
          message="Are you sure you want to delete this order?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
