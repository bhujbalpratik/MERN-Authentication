import mongoose from "mongoose"

const MongoConnection = () => {
  mongoose
    .connect(process.env.MONGOURI, { dbName: "Auth" })
    .then(() => console.log(`connected to mongo`))
    .catch((e) => console.log(`DB Connection Error : ${e}`))
}

export default MongoConnection
