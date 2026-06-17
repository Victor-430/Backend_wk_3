import { Router } from "express";
import commentsController from "../controller/commentsController.js";


const commentsRoutes = Router()

commentsRoutes.post("/", commentsController.addComments)
commentsRoutes.get("/:postId", commentsController.getComments)

export default commentsRoutes
