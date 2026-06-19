import { ObjectId } from "mongodb";
import { POSTS } from "../model/postsModel.js";

export const createPost = async (postData) => {
  const result = await POSTS.insertOne(postData);
  return { ...postData, _id: result.insertedId };
};

export const getPostById = async (postId) => {
  if (!postId) {
    const error = new Error("Post Id is required");
    error.status = 400;
    throw error;
  }

  if (!ObjectId.isValid(postId)) {
    const error = new Error("Invalid Post Id");
    error.status = 400;
    throw error;
  }

  const post = await POSTS.findOne({ _id: new ObjectId(postId) });
  if (!post) {
    const error = new Error("Post not found");
    error.status = 404;
    throw error;
  }

  return post;
};

export const getAllPosts = async () => {
  const posts = await POSTS.find().sort({ createdAt: -1 }).toArray();
  return posts;
};

export const deletePostById = async (postId) => {
  if (!postId) {
    const error = new Error("Post Id is required");
    error.status = 400;
    throw error;
  }

//   write ownership check here before deleting the post
  if (!ObjectId.isValid(postId)) {
    const error = new Error("Invalid Post Id");
    error.status = 400;
    throw error;
  }

  const doc = await POSTS.deleteOne({ _id: new ObjectId(postId) });
  if (doc.deletedCount === 0) {
    const error = new Error("Post not found or already deleted");
    error.status = 404;
    throw error;
  }

  return true;
};
