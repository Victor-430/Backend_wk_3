import { createPost as savePost } from "../service/postService.js";
import { v4 as uuidv4 } from "uuid";

const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPost = {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date(),
    };

    await savePost(newPost);

    return res
      .status(201)
      .json({ message: "Post created successfully", newPost });
  
    } catch (err) {
    next(err);
  }
};

const getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({ message: "Post Id is required" });
    }

    const post = await getPostById(postId);
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
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({ message: "Post Id is required" });
    }

    if (postId !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this post" });
    }

    await deletePostById(postId);
    return res.status(204).json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export default { createPost, getPost, getPosts, deletePost };
