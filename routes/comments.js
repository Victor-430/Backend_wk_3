import { Router } from "express";
import { addComments, getComments } from "../controller/commentsController";


const commentsRoutes = Router()

commentsRoutes.post("/", addComments)
commentsRoutes.get("/:postId", getComments)

export default commentsRoutes