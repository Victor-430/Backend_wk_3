import { getDb } from "../config/db.js";

export const USER = getDb().collection("users");
