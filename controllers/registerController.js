import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../service/userService.js";

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // if (!username || !email || !password) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already registered" });
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

    res.status(201).json({ message: "User registered successfully", userResponse });
  } catch (error) {
    next(error);
  }
};

export default registerUser;
