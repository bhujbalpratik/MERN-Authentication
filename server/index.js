import express from "express"
import MongoConnection from "./data/mongoose.js"
import { config } from "dotenv"
import userRouter from "./routers/user.routers.js"

config({ path: "./server/config/.env" })

const app = express()

app.use("/api/user", userRouter)

app.get("/", (req, res) => {
  res.send("Home")
})

MongoConnection()

app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`)
})
