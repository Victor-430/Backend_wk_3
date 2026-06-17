import { Router } from "express";
import commentsController from "../controller/commentsController.js";
import { auth } from "../middleware/auth.js";


const commentsRoutes = Router()

commentsRoutes.post("/", auth, commentsController.addComments)
commentsRoutes.get("/:postId", commentsController.getComments)

export default commentsRoutes
