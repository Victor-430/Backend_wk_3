import {
  logFailedLogin,
  logLogin,
  logRegister,
} from "../loggers/authLogger.js";
import { AppError } from "../utils/AppError.js";
import { createUser, findUserByEmail } from "./userService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerAuthService = async ({ username, email, password }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new AppError("User with this email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    username,
    email,
    password: hashedPassword,
  };

  const result = await createUser(userData);

  const userResponse = {
    _id: result.insertedId,
    username,
    email,
  };

  logRegister(email, userResponse._id);
  return { user: userResponse };
};

export const loginAuthService = async ({ email, password, ip }) => {
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      logFailedLogin(email, ip);
      throw new AppError("Invalid email or password", 401);
    }

    if (!password) {
      logFailedLogin(email, ip);
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      logFailedLogin(email, ip);
      throw new AppError("Invalid email or password", 401);
    }

    const safeUser = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    logLogin(email, user._id);
    return { token, user: safeUser };
  } catch (err) {
    if (err instanceof AppError) throw err;

    throw new AppError("Unexpected error occurred", 500);
  }
};
