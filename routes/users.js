import {Router} from "express"
import registerUser from "../controller/registerController.js"
import loginUser from "../controller/loginController.js"
import { auth } from "../middleware/auth.js"

const userRoutes = Router()

userRoutes.post("/register", auth, registerUser)
userRoutes.post("/login", auth,loginUser )

export default userRoutes
