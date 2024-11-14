import { z } from "zod";

export const textSchema = z.object({
  text: z.string(),
});

export type TextSchema = z.infer<typeof textSchema>;
