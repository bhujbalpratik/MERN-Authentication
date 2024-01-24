import express from "express"

const app = express()

app.listen(3000, () => {
  console.log(`server is working on https://localhost:3000`)
})
