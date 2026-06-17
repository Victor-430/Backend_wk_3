import { createPost as savePost } from "../service/postService.js";
import { v4 as uuidv4 } from "uuid";

const createPost = async (req, res, next) => {
 const {title, content} = req.body

 if (!title || !content) {
    return res.status(400).json({message: "All fields are required"})
 }


 const newPost = {
    postId:uuidv4(),
    title, 
    content,
    createdAt: new Date(),

  }

  await savePost(newPost)

  return res.status(201).json({message: "Post created successfully", newPost})

}

const getPost = (req, res, next) => {

}
const getPosts = (req, res, next) => {

}
const deletePost = (req, res, next) => {

}

export default { createPost, getPost, getPosts, deletePost }
