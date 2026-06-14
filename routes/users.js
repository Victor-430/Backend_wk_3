import {Router} from "express"
import user from "../controller/registerController"
import registerUser from "../controller/registerController"
import loginUser from "../controller/loginController"

const userRoutes = Router()

userRoutes.post("/register", registerUser)
userRoutes.post("/login", loginUser )

export default userRoutes