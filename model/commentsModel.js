import { getDb } from "../config/db.js";

export const COMMENTS = () => getDb().collection("comments");
