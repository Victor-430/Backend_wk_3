import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../service/userService.js";

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // if (!username || !email || !password) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }

    const { userResponse } = await registerAuthService({
      username,
      email,
      password,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userResponse });
  } catch (error) {
    next(error);
  }
};

export default registerUser;
