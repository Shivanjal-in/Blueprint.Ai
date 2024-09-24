import { z } from "zod";

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(4, { message: "Password must be atleast 4 characters" }),
  confirmPassword: z
    .string()
    .min(4, { message: "Password must be atleast 4 characters" }),
});
