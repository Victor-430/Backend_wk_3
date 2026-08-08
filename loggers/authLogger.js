import { logger } from "../config/logger.js";

export const logAuth = (req) => {
  const { method, originalUrl, user, ip } = req;
  logger.warn({
    type: "SECURITY",
    message: "MISSING TOKEN",
    method,
    url: originalUrl,
    ip,
  });
};

export const logLogin = (email, userId) => {
  logger.info({
    type: "AUDIT",
    message: "USER_LOGIN",
    userId,
    email,
    timestamp: new Date().toISOString(),
  });
};

export const logFailedLogin = (email, ip) => {
  logger.warn({
    type: "SECURITY",
    message: "FAILED_LOGIN",
    email,
    ip,
    timestamp: new Date().toISOString(),
  });
};

export const logRegister = (userId, email) => {
  logger.info({
    type: "AUDIT",
    message: "USER_REGISTER",
    userId,
    email,
    timestamp: new Date().toISOString(),
  });
};
