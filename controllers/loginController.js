import bcrypt from "bcrypt";
import { loginAuthService } from "../services/authService.js";
import { catchAsync } from "../utils/CatchAsync.js";

export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const ip = req.ip || req.connection.remoteAddress;
  const { token, user } = await loginAuthService({ email, password, ip });

  return res.status(200).json({ message: "Login successful", user, token });
});
