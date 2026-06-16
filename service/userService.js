import { USER } from "../model/userModel";

const userService = async (email) => {
  const findUserEmail = await USER.findOne({ email });

  if (findUserEmail) {
    const error = new Error("User with this email already registered");
    error.status = 400;
    throw error;
  }
};

const createUser = async (userData) => {
  const data = await USER.insertOne(userData);
  return data;
};

export { userService, createUser };
