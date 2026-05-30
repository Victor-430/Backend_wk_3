import express from "express"
import userRoutes from "./routes/users"
import commentsRoutes from "./routes/comments"
import postRoutes from "./routes/posts"
import routeNotFound from "./middlewares/routeNotFound"
import globalErrorHandler from "./middlewares/globalErrorHandler"

const app = express()

app.use(express.json(), {extended:false})


app.use("api/users", userRoutes)
app.use("api/posts", postRoutes)
app.use("api/comments", commentsRoutes)


app.use(routeNotFound)
app.use(globalErrorHandler)

app.listen(5000, () => {
    console.log("Server is running on port 5000")

})