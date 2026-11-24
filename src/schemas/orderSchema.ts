import { z } from "zod";

export const orderSchema = z.object({
  customer: z.string().min(1, { message: "Customer name is required" }),
  product: z.string().min(1, { message: "Select a product" }),
  quantity: z.number({ message: "Enter a quantity" }).min(1, { message: "Quantity must be at least 1" }),
});

export type OrderFormFields = z.infer<typeof orderSchema>;