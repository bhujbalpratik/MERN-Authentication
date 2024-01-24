import express from "express"
import MongoConnection from "./data/mongoose.js"
import { config } from "dotenv"

config({ path: "./api/config/.env" })

const app = express()

app.get("/", (req, res) => {
  res.send("Home")
})

MongoConnection()

app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`)
})
