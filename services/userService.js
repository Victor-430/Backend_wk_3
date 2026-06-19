import { ObjectId } from "mongodb";
import { USER } from "../model/userModel.js";

const findUserByEmail = async (email) => {
  return await USER.findOne({ email });
};

const findUserById = async (id) => {
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

const createUser = async (userData) => {
  const data = await USER.insertOne(userData);
  return data;
};

export { findUserByEmail, findUserById, createUser };
