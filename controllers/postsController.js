import {
  createPost as savePost,
  deletePostById,
  getAllPosts,
  getPostById,
} from "../services/postService.js";
import { catchAsync } from "../utils/CatchAsync.js";

export const createPost = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;

  const newPost = {
    title,
    content,
    userId: req.user._id,
    createdAt: new Date(),
  };

  const savedPost = await savePost(newPost);

  return res
    .status(201)
    .json({ message: "Post created successfully", post: savedPost });
});

export const getPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await getPostById(id);
  return res.status(200).json({ message: "Post found", post });
});

export const getPosts = catchAsync(async (req, res, next) => {
  const posts = await getAllPosts();
  return res.status(200).json({ message: "Posts found", posts });
});

export const deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const userId = req.user._id;

  await deletePostById(id, userId);
  return res.status(200).json({ message: "Post deleted successfully" });
});
