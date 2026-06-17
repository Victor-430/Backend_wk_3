import { getDb } from "../config/db";

export const POSTS = getDb().collection("posts")