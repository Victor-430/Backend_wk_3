import { ObjectId } from "mongodb";
import { COMMENTS } from "../model/commentsModel.js";

export const addComment = async (commentData) => {
  const doc = {
    ...commentData,
    postId: new ObjectId(commentData.postId),
    userId: new ObjectId(commentData.userId),
  };

  const result = await COMMENTS.insertOne(doc);
  return { ...doc, _id: result.insertedId };
};

export const getCommentsByPostId = async (postId) => {
  if (!postId) {
    const error = new Error("Post ID is required");
    error.status = 400;
    throw error;
  }

  if (!ObjectId.isValid(postId)) {
    const error = new Error("Invalid Post Id");
    error.status = 400;
    throw error;
  }

  const comments = await COMMENTS.find({ postId: new ObjectId(postId) })
    .sort({ createdAt: -1 })
    .toArray();

  return comments;
};
