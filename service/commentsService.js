import { COMMENTS } from "../model/commentsModel.js";

export const addComment = async (commentData) => {
  const doc = {
    ...commentData,
    createdAt: new Date(),
  };

  const result = await COMMENTS.insertOne(doc);
  return { ...doc, _id: result.insertedId };
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
