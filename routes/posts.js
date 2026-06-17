import { Router } from "express";
import posts from "../controller/postsController.js";
import { auth } from "../middleware/auth.js";

const postRoutes = Router()

postRoutes.post("/", auth, posts.createPost)
postRoutes.get("/", auth, posts.getPosts)
postRoutes.get("/:id", auth, posts.getPost)
postRoutes.delete("/:id", auth, posts.deletePost)

export default postRoutes
