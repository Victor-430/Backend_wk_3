import { ObjectId } from "mongodb";
import { POSTS } from "../model/postsModel.js";

export const createPost = async (postData) => {
  const result = await POSTS.insertOne(postData);
  return { ...postData, _id: result.insertedId };
};

export const getPostById = async (postId) => {
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

export const deletePostById = async (id, userId) => {
  //  ownership check before deleting the post
  if (!ObjectId.isValid(id)) {
    const error = new Error("Invalid Post Id");
    error.status = 400;
    throw error;
  }

  const post = await getPostById(id);

  if (post.userId !== userId) {
    const error = new Error("You are not authorized to delete this post");
    error.status = 403;
    throw error;
  }

  const doc = await POSTS.deleteOne({ _id: new ObjectId(id) });
  if (doc.deletedCount === 0) {
    const error = new Error("Post not found or already deleted");
    error.status = 404;
    throw error;
  }

  return true;
};
