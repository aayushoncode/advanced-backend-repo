import { email, z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "name must be 3 characters long"),
  email: z.string().email("invalid email format"),
  password: z.string().min(8, "password must be 8 characters long"),
});
export const loginSchema = z.object({
  email: z.string().email("invalid email format"),
  password: z.string().min(8, "password must be 8 characters long"),
});
