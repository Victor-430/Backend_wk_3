import express from "express"
import routeNotFound from "./middleware/routeNotFound.js"
import globalErrorHandler from "./middleware/globalErrorHandler.js"
import { connectDb } from "./config/db.js"
import { requestLogger } from "./middleware/requestLogger.js"


const app = express()

app.use(express.json(), {extended:false})

await connectDb()

const { default: userRoutes } = await import("./routes/users.js")
const { default: commentsRoutes } = await import("./routes/comments.js")
const { default: postRoutes } = await import("./routes/posts.js")

// logger
app.use(requestLogger)

// routes
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentsRoutes)


app.use(routeNotFound)
app.use(globalErrorHandler)

app.listen(5000, () => {
    console.log("Server is running on port 5000")

})
