import { logFailedLogin, logLogin, logRegister } from "../loggers/authLogger.js";

export const registerAuthService = async (userData) => {
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

  logRegister(email, userResponse._id)
  return userResponse
};

export const loginAuthService = async (email, password,ip) => {
  const user = await findUserByEmail(email);

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!user || !isPasswordValid) {
    // const error = new Error("Invalid email or password");
    // error.status = 400;
    // throw error;
    logFailedLogin(email, ip)
    throw new AppError("Invalid email or password", 400);
  }

  const token = jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  logLogin(email, user._id)
  return token
};
