import { ObjectId } from "mongodb";
import { COMMENTS } from "../model/commentsModel.js";
import { logCommentCreated } from "../loggers/commentLogger.js";
import { AppError } from "../utils/AppError.js";

export const addComment = async (commentData) => {
  try {
    const doc = {
      ...commentData,
      postId: new ObjectId(commentData.postId),
      userId: new ObjectId(commentData.userId),
    };

    const result = await COMMENTS().insertOne(doc);

     if (!result.acknowledged) {
      throw new AppError("Failed to add comment", 500)
    }

    const commentId = result.insertedId;
    const userId = commentData.userId;

    logCommentCreated(userId, commentId);
    return { ...doc, _id: result.insertedId };
  } catch (err) {
    if (err instanceof AppError) throw err;

    throw new AppError("Unexpected error occurred", 500);
  }
};

export const getCommentsByPostId = async (postId) => {
  try {
    if (!ObjectId.isValid(postId)) {
      throw new AppError("Invalid Post Id", 400);
    }

    const comments = await COMMENTS()
      .find({ postId: new ObjectId(postId) })
      .sort({ createdAt: -1 })
      .toArray();

    return comments;
  } catch (err) {
    if (err instanceof AppError) throw err;

    throw new AppError("Unexpected error occurred", 500);
  } 
};
