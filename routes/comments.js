import { Router } from "express";
import commentsController from "../controller/commentsController.js";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { addCommentsSchema } from "../validators/commentValidator.js";


const commentsRoutes = Router()

commentsRoutes.post("/", auth, validate(addCommentsSchema),commentsController.addComments)
commentsRoutes.get("/:postId", validate(getCommentsSchema, "params"), commentsController.getComments)

export default commentsRoutes
