import { ObjectId } from "mongodb";
import { USER } from "../model/userModel.js";
import { AppError } from "../utils/AppError.js";

export const findUserByEmail = async (email) => {
  return await USER().findOne({ email });
};

export const findUserById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new AppError("Invalid User Id", 400);
  }
  const user = await USER().findOne({ _id: new ObjectId(id) });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const createUser = async (userData) => {
  const data = await USER().insertOne(userData);
  return data;
};
