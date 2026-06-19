import { ObjectId } from "mongodb";
import { USER } from "../model/userModel.js";

const findUserByEmail = async (email) => {
 
  return await USER.findOne({ email });
};

const findUserById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return await USER.findOne({ _id: new ObjectId(id) });
};

const createUser = async (userData) => {
  const data = await USER.insertOne(userData);
  return data;
};

export { findUserByEmail, findUserById, createUser };
