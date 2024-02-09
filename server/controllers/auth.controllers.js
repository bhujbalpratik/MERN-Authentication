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

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECURITY_KEY)
      const { password: hashedPassword, ...rest } = user._doc
      return res
        .cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        .status(200)
        .json(rest)
    } else {
      const genratePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)

      const hashedPassword = bcryptjs.hashSync(genratePassword, 10)

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      })
      await newUser.save()
      const token = jwt.sign({ id: newUser._id }, process.env.SECURITY_KEY)
      const { password: hashedPassword2, ...rest } = newUser._doc
      return res
        .cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        .status(200)
        .json(rest)
    }
  } catch (error) {
    next(error)
  }
}

export const signOut = (req, res) => {
  res.clearCookie("token").status(200).json("user signout successfully")
}
