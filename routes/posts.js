import { Router } from "express";
import {
  createPost,
  getPost,
  getPosts,
  deletePost,
} from "../controllers/postsController.js";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createPostSchema, getPostIdSchema } from "../validators/postValidator.js";

export const postRoutes = Router();

postRoutes.post("/", auth, validate(createPostSchema), createPost);
postRoutes.get("/:id", validate(getPostIdSchema, "params"), getPosts);
postRoutes.get("/:id", validate(getPostIdSchema, "params"), getPost);
postRoutes.delete(
  "/:id",
  auth,
  validate(getPostIdSchema, "params"),
  deletePost,
);
