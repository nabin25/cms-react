import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(5, "Name cannot be less than 5 characters")
    .max(30, "Name cannot be more than 30 characters"),
  image: z.string().url({ message: "Please enter a valid url." }),
});

export type CategoryType = z.infer<typeof categorySchema>;
