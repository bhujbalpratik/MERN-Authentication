import express from "express"
import MongoConnection from "./data/mongoose.js"
import { config } from "dotenv"
import userRouter from "./routers/user.routers.js"
import authRouter from "./routers/auth.routers.js"
import cookieParser from "cookie-parser"
import path from "path"

config({ path: "./.env" })

const __dirname = path.resolve()

const app = express()

app.use(express.static(path.join(__dirname, "/client/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

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
