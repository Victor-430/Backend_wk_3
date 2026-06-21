import { logGlobalError } from "../loggers/globalErrorLogger.js";

export const globalErrorHandler = (err, req, res, next) => {
  logGlobalError(err, req);

  const statusCode = err.status || 500;
  const message = err.message || "Internal server error";

  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  res.status(statusCode).json({ message });
};
