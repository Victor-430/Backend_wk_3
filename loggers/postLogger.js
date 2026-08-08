import { logger } from "../config/logger.js";

export const logPostCreated = (userId, postId) => {
  logger.info({
    type: "AUDIT",
    message: "POST_CREATED",
    timestamp: new Date().toISOString(),
    postId,
    userId,
  });
};

export const logPostDeleted = (userId, id) => {
  logger.info({
    type: "AUDIT",
    message: "POST_DELETED",
    timestamp: new Date().toISOString(),
    postId: id,
    userId,
  });
};
