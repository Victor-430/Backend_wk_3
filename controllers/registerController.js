import bcrypt from "bcrypt";
import { registerAuthService } from "../services/authService.js";
import { catchAsync } from "../utils/CatchAsync.js";

export const registerUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const { user } = await registerAuthService({
    username,
    email,
    password,
  });

  res.status(201).json({ message: "User registered successfully", user });
});
