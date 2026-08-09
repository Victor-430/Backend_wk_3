import { ObjectId } from "mongodb";
import { USER } from "../model/userModel.js";
import { AppError } from "../utils/AppError.js";

export const findUserByEmail = async (email) => {
  try {
    return await USER().findOne({ email });
  } catch (err) {
    if (err instanceof AppError) throw err;

    throw new AppError("Unexpected error occurred", 500);
  }
};

export const findUserById = async (id) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new AppError("Invalid User Id", 400);
    }
    const user = await USER().findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  } catch (err) {
    if (err instanceof AppError) throw err;

    throw new AppError("Unexpected error occurred", 500);
  }
};

export const createUser = async (userData) => {
  try {
    const data = await USER().insertOne(userData);
    return data;
  } catch (err) {
    if (err instanceof AppError) throw err;

    throw new AppError("Unexpected error occurred", 500);
  }
};
