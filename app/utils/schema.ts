import { z } from "zod";

export const textSchema = z.object({
  text: z.string().min(2),
});

export type TextSchema = z.infer<typeof textSchema>;
