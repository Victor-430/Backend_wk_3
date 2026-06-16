import { getDb } from "../config/db";

export const USER = getDb().collection("users");
