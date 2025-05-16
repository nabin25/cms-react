import { z } from "zod";

export const authorSchema = z.object({
  name: z
    .string()
    .min(5, "Name cannot be less than 5 characters")
    .max(30, "Name cannot be more than 30 characters"),
  avatar: z.string().url({ message: "Please enter a valid url." }),
  bio: z.string().min(20, "Bio must not be less than 20 characters"),
});

export type AuthorType = z.infer<typeof authorSchema>;
