import { Router } from "express";
import posts from "../controller/postsController.js";

const postRoutes = Router()

postRoutes.post("/", posts.createPost)
postRoutes.get("/", posts.getPosts)
postRoutes.get("/:id", posts.getPost)
postRoutes.delete("/:id", posts.deletePost)

export default postRoutes
