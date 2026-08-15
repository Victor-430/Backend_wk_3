import { getPostById } from "../services/postService.js";
import {
  addComment,
  getCommentsByPostId,
} from "../services/commentsService.js";
import { catchAsync } from "../utils/CatchAsync.js";

export const addComments = catchAsync(async (req, res, next) => {
  const { postId, title, content } = req.body;

  const post = await getPostById(postId);

  const newComment = {
    postId,
    userId: req.user._id,
    title,
    content,
    createdAt: new Date(),
  };

  const comment = await addComment(newComment);

  return res.status(201).json({
    message: "Comment added successfully",
    comment,
  });
});

export const getComments = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const comments = await getCommentsByPostId(postId);

  return res.status(200).json({
    message: "Comments fetched successfully",
    comments,
  });
});
