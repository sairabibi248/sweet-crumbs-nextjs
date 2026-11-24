import { z } from "zod";

export const itemSchema = z.object({
  title: z.string().min(1, { message: "Name is required" }),
  category: z.enum(["Cakes", "Donuts", "Macarons", "Cupcakes", "Cookies"]),
  price: z.number({ message: "Enter a price" }).min(1, { message: "Price must be at least 1" }),
  quantity: z.number({ message: "Enter a quantity" }).min(0, { message: "Quantity can not be negative" }),
  image: z.string().min(1, { message: "Select an image" }),
});

export type ItemFormFields = z.infer<typeof itemSchema>;