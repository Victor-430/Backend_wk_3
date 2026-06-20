import { ObjectId } from "mongodb";
import { COMMENTS } from "../model/commentsModel.js";
import { logCommentCreated } from "../loggers/commentLogger.js";

export const addComment = async (commentData) => {
  const doc = {
    ...commentData,
    postId: new ObjectId(commentData.postId),
    userId: new ObjectId(commentData.userId),
  };

  const result = await COMMENTS().insertOne(doc);

  const commentId = result.insertedId;
  const userId = commentData.userId;

  logCommentCreated(userId, commentId);
  return { ...doc, _id: result.insertedId };
};

export const getCommentsByPostId = async (postId) => {
  if (!ObjectId.isValid(postId)) {
    const error = new Error("Invalid Post Id");
    error.status = 400;
    throw error;
  }

  const comments = await COMMENTS().find({ postId: new ObjectId(postId) })
    .sort({ createdAt: -1 })
    .toArray();

  return comments;
};
