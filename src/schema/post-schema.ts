import { z } from "zod";

// Define the schema using zod
const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  content: z.string().min(1, "Content is required").max(500, "Content must be less than 500 characters"),
});

export default postSchema;