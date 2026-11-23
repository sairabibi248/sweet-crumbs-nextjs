import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginFormFields = z.infer<typeof loginSchema>;