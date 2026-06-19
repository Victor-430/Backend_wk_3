import {Router} from "express"
import {loginUser} from "../controller/loginController.js"
import { auth } from "../middleware/auth.js"
import { registerSchema } from "../validators/userValidator.js"

const userRoutes = Router()

userRoutes.post("/register", validate(registerSchema), registerUser)
userRoutes.post("/login", validate(loginSchema), loginUser )

export default userRoutes
