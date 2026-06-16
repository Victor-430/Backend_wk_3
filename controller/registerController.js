import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userService(email);

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      id: uuidv4(),
      username,
      email,
    };


    res.status(201).json({ message: "User registered successfully", userData });
  } catch (error) {
    next(err);
  }
};

export default registerUser;
