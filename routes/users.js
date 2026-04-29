import {Router} from "express"
import user from "../controller/userController"

const userRoutes = Router()

userRoutes.post("/register", user )
userRoutes.post("/login", user )

export default userRoutes