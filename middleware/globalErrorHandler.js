import { logGlobalError } from "../loggers/globalErrorLogger.js";
import { AppError } from "../utils/AppError.js";

export const globalErrorHandler = (err, req, res, next) => {
  logGlobalError(err, req);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (process.env.NODE_ENV === "development") {
    return res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }

  res.status(500).json({ message: "Internal server error" });
};
