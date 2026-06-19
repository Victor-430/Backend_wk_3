import z from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export const getPostIdSchema = z.object({
    id: z.string().min(1, "Post Id is required")
});