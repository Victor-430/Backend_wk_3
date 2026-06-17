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
    const error = new Error("Post not found");
    error.status = 404;
    throw error;
  }
  return post;
};

export const getAllPosts = async () => {
  const posts = await POSTS.find()
    .sort({ createdAt: -1 })
    .toArray();
  return posts;
};

export const deletePostById = async (postId) => {
    if(!postId){
        const error = new Error("Post Id is required")
        error.status = 400
        throw error
    }

    const doc = await POSTS.deleteOne({postId})
    if (doc.deletedCount === 0){
        const error = new Error("Post not found or already deleted")
        error.status = 404
        throw error
    }
    return true

}