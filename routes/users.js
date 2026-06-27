import {Router} from "express"
import { auth } from "../middleware/auth.js"
import { loginSchema, registerSchema } from "../validators/userValidator.js"
import { loginUser } from "../controllers/loginController.js"
import { registerUser } from "../controllers/registerController.js"
import { validate } from "../middleware/validate.js"
import { authRateLimiter } from "../middleware/rateLimiter.js"

export const userRoutes = Router()

userRoutes.post("/register", validate(registerSchema), registerUser)
userRoutes.post("/login", authRateLimiter, validate(loginSchema), loginUser )

