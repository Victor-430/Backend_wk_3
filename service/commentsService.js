import { COMMENTS } from "../model/commentsModel.js";

export const addComment = async (commentData) => {
  const doc = {
    ...commentData
  };

  const result = await COMMENTS.insertOne(doc);
  return { ...doc, commentId: result.insertedId };
};

export const getCommentsByPostId = async (postId) => {
  if (!postId) {
    const error = new Error("Post ID is required");
    error.status = 400;
    throw error;
  }
  const comments = await COMMENTS.find({ postId })
    .sort({ createdAt: -1 })
    .toArray();
  return comments;
};
