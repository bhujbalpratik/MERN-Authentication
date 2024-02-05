import bcryptjs from "bcryptjs"
import { User } from "../models/user.models.js"
import { errorHandler } from "../utils/errorHandler.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body
  const userEmail = await User.findOne({ email })
  const userName = await User.findOne({ username })

  if (userEmail) return next(errorHandler(400, "User Already Exist"))
  if (userName) return next(errorHandler(400, "Username Already Taken"))

  const hashedPassword = bcryptjs.hashSync(password, 10)
  const Newuser = new User({ username, email, password: hashedPassword })
  try {
    await Newuser.save()
    res.status(201).json({ message: "User Created Successfully" })
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(404, "User Not Found"))
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) return next(errorHandler(401, "Invalid Password"))
    const { password: hashedPassword, ...rest } = validUser._doc
    const token = jwt.sign({ id: validUser._id }, process.env.SECURITY_KEY)

    res
      .cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
      .status(200)
      .json(rest)
  } catch (error) {
    next(error)
  }
}
