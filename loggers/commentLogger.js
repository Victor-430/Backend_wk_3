import { logger } from "../config/logger.js";

export const logCommentCreated = (userId, commentId) => {
    logger.info({
        type: "AUDIT",
        message: "COMMENT_CREATED",
        timestamp: new Date().toISOString(),
        commentId,
        userId,
    });
}   
  