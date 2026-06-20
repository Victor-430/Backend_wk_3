import bcrypt from "bcrypt";
import { loginAuthService } from "../services/authService.js";

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const ip = req.ip || req.connection.remoteAddress;
    const { token, user } = await loginAuthService({ email, password, ip });

    return res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    next(err);
  }
};
