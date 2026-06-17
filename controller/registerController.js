import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { findUserByEmail } from "../service/userService";

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await findUserByEmail(email);

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      userResponse: {
        id: uuidv4(),
        username,
        email,
      },
      password: hashedPassword,
    };

    const { password, ...userResponse } = userData;
    await createUser(userData);

    res
      .status(201)
      .json({ message: "User registered successfully", userResponse });
  } catch (error) {
    next(error);
  }
};

export default registerUser;
