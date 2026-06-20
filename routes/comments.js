import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { addCommentsSchema, getCommentsSchema } from "../validators/commentValidator.js";
import { addComments, getComments } from "../controllers/commentsController.js";


export const commentsRoutes = Router()

commentsRoutes.post("/", auth, validate(addCommentsSchema),addComments)
commentsRoutes.get("/:postId", validate(getCommentsSchema, "params"), getComments)


