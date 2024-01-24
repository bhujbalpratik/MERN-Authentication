import bcryptjs from "bcryptjs"
import { User } from "../models/user.models.js"

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const Newuser = new User({ username, email, password: hashedPassword })
  try {
    await Newuser.save()
    res.status(201).json({ message: "User Created Successfully" })
  } catch (error) {
    next(error)
  }
}
