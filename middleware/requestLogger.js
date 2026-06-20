import { logger } from "../config/logger";

export const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  const { method, url, user } = req;

  res.on("finish", () => {
    logger.info({
      type: "REQUEST",
      method,
      url,
      status: res.statusCode,
      duration: `${Date.now() - startTime}ms`,
      userId: user?._id || null,
    });
  });

  next();
};
