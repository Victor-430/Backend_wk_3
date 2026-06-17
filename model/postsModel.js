import { getDb } from "../config/db.js";

export const POSTS = getDb().collection("posts");
