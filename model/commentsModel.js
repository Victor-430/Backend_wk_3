import { getDb } from "../config/db";

export const COMMENTS = getDb()
  .collection("comments")
  .createIndex({ postId: 1, createdAt: -1 });
