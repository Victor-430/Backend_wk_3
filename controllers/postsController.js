import {
  createPost as savePost,
  deletePostById,
  getAllPosts,
  getPostById,
} from "../services/postService.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // if (!title || !content) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }

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
  } catch (err) {
    next(err);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    // if (!id) {
    //   return res.status(400).json({ message: "Post Id is required" });
    // }

    const post = await getPostById(id);
    return res.status(200).json({ message: "Post found", post });
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    return res.status(200).json({ message: "Posts found", posts });
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    // if (!id) {
    //   return res.status(400).json({ message: "Post Id is required" });
    // }

    const userId = req.user._id;

    await deletePostById(id, userId);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};

