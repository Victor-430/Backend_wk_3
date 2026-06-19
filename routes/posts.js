import { Router } from "express";
import {posts} from "../controllers/postsController.js";
import { auth } from "../middleware/auth.js";

const postRoutes = Router()

postRoutes.post("/", auth, validate(createPostSchema),posts.createPost)
postRoutes.get("/",   validate(getPostsSchema),posts.getPosts)
postRoutes.get("/:id",  validate(getPostsSchema, "params"),posts.getPost)
postRoutes.delete("/:id", auth, validate(deletePostSchema, "params"), posts.deletePost)

export default postRoutes
