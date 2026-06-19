export const registerAuthService = async (userData) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User with this email already registered" });
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
};

export const loginAuthService = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
};
