import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const getEnvVariable = (key) => {
  const value = process.env[key]
  if (!value){
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value
}

const password = getEnvVariable("MONGODB_PASSWORD")
const user = getEnvVariable("MONGODB_USER")

if (!password) {
  throw new Error("Missing MongoDB password in .env");
}

const uri = `mongodb+srv://${user}:${password}@cluster0.glopqdu.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

export const connectDb = async () => {
  if (db) return db;

  await client.connect();
  db = client.db("backend_wk_3");
  await db.command({ ping: 1 });

  await Promise.all([
    db.collection("users").createIndex({ email: 1 }, { unique: true }),
    db.collection("users").createIndex({ id: 1 }, { unique: true }),
    db.collection("posts").createIndex({ createdAt: -1 }),
    // db.collection("posts").createIndex({ userId: 1 }),
    db.collection("comments").createIndex({ postId: 1, createdAt: -1 }),
    // db.collection("comments").createIndex({ userId: 1 }),
  ]);

  console.log(`Connected to MongoDB : ${db.databaseName}`);
  return db;
}

export const getDb = () => {
  if (!db) {
    throw new Error("Database not connected. Call connectDb() first.");
  }

  return db;
}
