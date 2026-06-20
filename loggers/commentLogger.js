import { logger } from "../config/logger.js";

export const logCommentCreated = (userId, commentId) => {
    logger.info({
        type: "AUDIT",
        action: "COMMENT_CREATED",
        timestamp: new Date().toISOString(),
        commentId,
        userId,
    });
}   
  