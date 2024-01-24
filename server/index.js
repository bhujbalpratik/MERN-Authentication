import express from "express"
import MongoConnection from "./data/mongoose.js"
import { config } from "dotenv"
import userRouter from "./routers/user.routers.js"
import authRouter from "./routers/auth.routers.js"

config({ path: "./server/config/.env" })

const app = express()

app.use(express.json())
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

app.get("/", (req, res) => {
  res.send("Home")
})

MongoConnection()

app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`)
})