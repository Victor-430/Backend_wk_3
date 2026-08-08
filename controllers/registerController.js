import bcrypt from "bcrypt";
import { registerAuthService } from "../services/authService.js";

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const { user } = await registerAuthService({
      username,
      email,
      password,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
};
