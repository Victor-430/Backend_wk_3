import { ObjectId } from "mongodb";
import { POSTS } from "../model/postsModel.js";
import { logPostCreated, logPostDeleted } from "../loggers/postLogger.js";
import { AppError } from "../utils/AppError.js";

export const createPost = async (postData) => {
  try {
    const result = await POSTS().insertOne(postData);

    if (!result.acknowledged) {
      throw new AppError("Failed to create post", 500)
    }

    const userId = postData.userId;
    const id = result.insertedId;

    logPostCreated(userId, id);
    return { ...postData, _id: id };
  } catch (err) {
    if (err instanceof AppError) throw err;

    throw new AppError("Unexpected error occurred", 500);
  }
};

export const getPostById = async (postId) => {
  try {
    if (!ObjectId.isValid(postId)) {
      throw new AppError("Invalid Post Id", 400);
    }

    const post = await POSTS().findOne({ _id: new ObjectId(postId) });
    if (!post) {
      throw new AppError("Post not found", 404);
    }

    return post;
  } catch (err) {
    if (err instanceof AppError) throw err;

    throw new AppError("Unexpected error occurred", 500);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await POSTS().find().sort({ createdAt: -1 }).toArray();
    return posts;
  } catch (err) {
    if (err instanceof AppError) throw err;

    throw new AppError("Unexpected error occurred", 500);
  }
};

export const deletePostById = async (id, userId) => {
  try {
    //  ownership check before deleting the post
    if (!ObjectId.isValid(id)) {
      throw new AppError("Invalid Post Id", 400);
    }

    const post = await getPostById(id);

    if (post.userId !== userId) {
      throw new AppError("You are not authorized to delete this post", 403);
    }

    const doc = await POSTS().deleteOne({ _id: new ObjectId(id) });
    if (doc.deletedCount === 0) {
      throw new AppError("Post not found or already deleted", 404);
    }

    logPostDeleted(userId, id);
    return true;
  } catch (err) {
    if (err instanceof AppError) throw err;

    throw new AppError("Unexpected error occurred", 500);
  }
};
