import { Router } from "express";
import comments from "../controller/commentsController";

const commentsRoutes = Router()

commentsRoutes.post("/", comments)
commentsRoutes.get("/:id", comments)

export default commentsRoutes