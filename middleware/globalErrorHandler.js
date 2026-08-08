import { logGlobalError } from "../loggers/globalErrorLogger.js";
import { AppError } from "../utils/AppError.js";

export const globalErrorHandler = (err, req, res, next) => {
  logGlobalError(err, req);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Internal server error";

  if (err instanceof AppError) {
    res.status(statusCode).json({ message });
  }

  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  res.status(statusCode).json({ message });
};
