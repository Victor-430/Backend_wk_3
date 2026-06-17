const createPost = (req, res, next) => {
 const {title, content} = req.body

 if (!title || !content) {
    return res.status(400).json({message: "All fields are required"})
 }


 const newPost = {
    id:uuidv4(),
    title, 
    content,
    createdAt: new Date(),

 }

 return res.status(201).json({message: "Post created successfully", newPost})

}

const getPost = (req, res, next) => {

}
const getPosts = (req, res, next) => {

}
const deletePost = (req, res, next) => {

}

export default posts