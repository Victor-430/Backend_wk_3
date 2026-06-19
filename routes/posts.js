import { Router } from "express";
import posts from "../controllers/postsController.js";
import { auth } from "../middleware/auth.js";

const postRoutes = Router()

postRoutes.post("/", auth, posts.createPost)
postRoutes.get("/",  posts.getPosts)
postRoutes.get("/:id", posts.getPost)
postRoutes.delete("/:id", auth, posts.deletePost)

export default postRoutes
