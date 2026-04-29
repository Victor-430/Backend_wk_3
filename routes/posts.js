import { Router } from "express";
import posts from "../controller/postsController";

const postRoutes = Router()

postRoutes.post("/", posts)
postRoutes.get("/", posts)
postRoutes.get("/:id", posts)
postRoutes.delete("/:id", posts)

export default postRoutes