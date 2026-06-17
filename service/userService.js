import { USER } from "../model/userModel.js";

const findUserByEmail = async (email) => {
 
  return await USER.findOne({ email });
};

const findUserById = async (id) => {
    
  return await USER.findOne({ id });
}

const createUser = async (userData) => {
  const data = await USER.insertOne(userData);
  return data;
};

export { findUserByEmail, findUserById, createUser };
