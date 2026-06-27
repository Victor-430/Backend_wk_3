import express from "express";
import { userRoutes } from "./routes/users.js";
import { postRoutes } from "./routes/posts.js";
import { commentsRoutes } from "./routes/comments.js";
import { validate } from "./middleware/validate.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import { routeNotFound } from "./middleware/routeNotFound.js";
import { connectDb } from "./config/db.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { globalRateLimit } from "./middleware/rateLimiter.js";
import helmet from "helmet";
import { corsOptions } from "./config/cors.js";

await connectDb();

const app = express();

app.use(helmet());

app.use(cors(corsOptions));

app.use(globalRateLimit);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));

// request logger
app.use(requestLogger);

// routes
app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentsRoutes);

app.use(routeNotFound);
app.use(globalErrorHandler);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
