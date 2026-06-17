import { addComment, getCommentsByPostId } from "../service/commentsService.js";

const addComments = async (req, res, next) => {
  try {
    const { postId, title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if post exists
    if (!postId) {
      return res.status(400).json({ message: "Post Id required" });
    }

    const newComment = {
      postId,
      title,
      content,
      createdAt: new Date(),
    };

    const comments = await addComment(newComment);

    return res.status(201).json({
      message: "Comment added successfully",
      comments,
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
