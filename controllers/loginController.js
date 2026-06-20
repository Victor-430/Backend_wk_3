import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../services/userService.js";

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // if (!email || !password) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }
const ip = req.ip || req.connection.remoteAddress;
    const { token } = await loginAuthService({ email, password, ip });
    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    next(err);
  }
};

export default loginUser;
