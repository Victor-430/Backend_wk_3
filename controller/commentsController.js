import { getPostById } from "../service/postService.js";
import { addComment, getCommentsByPostId } from "../service/commentsService.js";

const addComments = async (req, res, next) => {
  try {
    const { postId, title, content } = req.body;

    if (!postId || !title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await getPostById(postId);

    if (post.userId !== req.user._id) {
      return res.status(403).json({ message: "You are not authorized to comment on this post" });
    }

    const newComment = {
      postId,
      userId: req.user._id,
      title,
      content,
    };

    const comment = await addComment(newComment);

    return res.status(201).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (err) {
    next(err);
  }
};

const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await getCommentsByPostId(postId);

    return res.status(200).json({
      message: "Comments fetched successfully",
      comments,
    });
  } catch (err) {
    next(err);
  }
};

export default { addComments, getComments };
