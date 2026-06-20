export const logAuth = (req) => {
  const { method, originalUrl, user, ip } = req;
  logger.warn({
    type: "SECURITY",
    event: "MISSING TOKEN",
    method,
    url: originalUrl,
    ip,
  });
};

export const logLogin = (userId, email) => {
  logger.info({
    type: "AUDIT",
    event: "USER_LOGIN",
    userId,
    email,
    timestamp: new Date().toISOString(),
  });
};

export const logFailedLogin = (email, ip) => {
  logger.warn({
    type: "SECURITY",
    action: "FAILED_LOGIN",
    email,
    ip,
    timestamp: new Date().toISOString(),
  });
};

export const logRegister = (userId, email) => {
  logger.info({
    type: "AUDIT",
    event: "USER_REGISTER",
    userId,
    email,
    timestamp: new Date().toISOString(),
  });
};
