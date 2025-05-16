import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be more than 10 characters")
    .max(150, "Title cannot be more 150 characters"),
  content: z.string(),
  author_id: z.string(),
  category_id: z.string(),
  status: z.enum(["Published", "Drafted"]),
  cover_image: z.string().url(),
  tags: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});

export type BlogData = z.infer<typeof blogSchema>;
