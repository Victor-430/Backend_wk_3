import {
  createPost as savePost,
  deletePostById,
  getAllPosts,
  getPostById,
} from "../service/postService.js";

const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPost = {
      title,
      content,
      userId: req.user._id,
      createdAt: new Date(),
    };

    const savedPost = await savePost(newPost);

    return res.status(201).json({ message: "Post created successfully", post: savedPost });
  } catch (err) {
    next(err);
  }
};

const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Post Id is required" });
    }

    const post = await getPostById(id);
    return res.status(200).json({ message: "Post found", post });
  } catch (err) {
    next(err);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    return res.status(200).json({ message: "Posts found", posts });
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Post Id is required" });
    }

    const post = await getPostById(id);

    if (post.userId !== req.user._id) {
      return res.status(403).json({ message: "You are not authorized to delete this post" });
    }

    await deletePostById(id);
    return res.status(204).json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export default { createPost, getPost, getPosts, deletePost };
