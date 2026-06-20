import { logger } from "../config/logger";

export const logPostCreated = (userId, postId) => {
  logger.info({
    type: "AUDIT",
    action: "POST_CREATED",
    timestamp: new Date().toISOString(),
    postId,
    userId,
  });
};

export const logPostDeleted = (userId, id) => {
  logger.info({
    type: "AUDIT",
    action: "POST_DELETED",
    timestamp: new Date().toISOString(),
    postId: id,
    userId,
  });
};
