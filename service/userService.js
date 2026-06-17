import { USER } from "../model/userModel.js";

const findUserByEmail = async (email) => {
 
  return await USER.findOne({ email });
};

const createUser = async (userData) => {
  const data = await USER.insertOne(userData);
  return data;
};

export { findUserByEmail, createUser };

