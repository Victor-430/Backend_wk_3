import { logger } from "../config/logger.js";

export const logGlobalError = (err, req) => {
  const { method, url, user } = req;
  const startTime = Date.now()
 logger.error({
    type: "ERROR",
    method,
    url,
    status: err.status || 500,
    duration: `${Date.now() - startTime}ms`,
    userId: user?._id || null,
    error: err.message,
    stack: err.stack,
  });
};
