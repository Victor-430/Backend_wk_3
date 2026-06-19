import z from "zod";

export const addCommentsSchema = z.object({
  postId: z.string().min(1, "Post Id is required"),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export const getCommentsSchema = z.object({
  postId: z.string().min(1, "Post Id is required"),
});