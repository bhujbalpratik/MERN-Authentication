import express from "express"
import MongoConnection from "./data/mongoose.js"
import { config } from "dotenv"
import userRouter from "./routers/user.routers.js"
import authRouter from "./routers/auth.routers.js"
import cookieParser from "cookie-parser"

config({ path: "./.env" })

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  })
})

app.get("/", (req, res) => {
  res.send("Home")
})

MongoConnection()

app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`)
})
