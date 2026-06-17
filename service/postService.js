import { POSTS } from "../model/postsModel.js";

export const createPost = async (postData) => {
  const doc = await POSTS.insertOne(postData);

  return { ...postData, postId: doc.insertedId };
};

export const getPostById = async (postId) => {
  if (!postId) {
    throw new Error("Post Id is required");
  }

  const post = await POSTS.findOne({ postId });
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

export const getAllPosts = async () => {
  const posts = await POSTS.find()
    .sort({ createdAt: -1 })
    .toArray();
  return posts;
};
