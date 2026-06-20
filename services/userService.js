import { ObjectId } from "mongodb";
import { USER } from "../model/userModel.js";

export const findUserByEmail = async (email) => {
  return await USER.findOne({ email });
};

export const findUserById = async (id) => {
  if (!ObjectId.isValid(id)) {
    const error = new Error("Invalid User Id");
    error.status = 400;
    throw error;
  }
  const user = await USER.findOne({ _id: new ObjectId(id) });

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return user;
};

export const createUser = async (userData) => {
  const data = await USER.insertOne(userData);
  return data;
};

