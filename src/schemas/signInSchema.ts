import { z } from "zod";

//identifier is email actually
export const signInSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});
