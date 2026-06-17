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
    throw new Error("Post ID is required");
  }
  const comments = await COMMENTS.find({ postId })
    .sort({ createdAt: -1 })
    .toArray();
  return comments;
};
