"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/ui/Modal";
import { useInventory } from "@/hooks/useInventory";
import { orderSchema, type OrderFormFields } from "@/schemas/orderSchema";

type OrderFormProps = {
  onSubmit: (data: OrderFormFields) => void;
  onClose: () => void;
};

const OrderForm = ({ onSubmit, onClose }: OrderFormProps) => {
  const { items } = useInventory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormFields>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customer: "",
      product: "",
      quantity: 1,
    },
  });

  const inputClass = "w-full border border-gray-300 dark:border-[#2A2B30] rounded-lg px-3 py-2 bg-white dark:bg-[#111214] text-[#111827] dark:text-[#F4F4F5] outline-none focus:border-[#C2416C]";

  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white dark:bg-[#1C1D21] rounded-xl p-6 w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold">Add Order</h2>

        <div className="flex flex-col gap-1">
          <label htmlFor="customer" className="text-sm font-medium">
            Customer
          </label>
          <input
            id="customer"
            type="text"
            {...register("customer")}
            className={inputClass}
          />
          {errors.customer && (
            <p className="text-red-500 text-sm">{errors.customer.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="product" className="text-sm font-medium">
            Product
          </label>
          <select
            id="product"
            {...register("product")}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">Select item</option>
            {items.map((item) => (
              <option key={item.id} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
          {errors.product && (
            <p className="text-red-500 text-sm">{errors.product.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="quantity" className="text-sm font-medium">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            {...register("quantity", { valueAsNumber: true })}
            className={inputClass}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-[#2A2B30] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#C2416C] text-white cursor-pointer"
          >
            Add Order
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default OrderForm;