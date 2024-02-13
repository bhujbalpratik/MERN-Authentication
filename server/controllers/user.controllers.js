import { errorHandler } from "../utils/errorHandler.js"
import bcryptjs from "bcryptjs"
import { User } from "../models/user.models.js"

export const test = (req, res) => {
  res.json({ message: "Api is Working" })
}

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can update only your account"))
  if (req.body.username?.trim() === "")
    return next(errorHandler(400, "Username can't be empty"))

  try {
    if (req.body.password)
      req.body.password = bcryptjs.hashSync(req.body.password, 10)

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    )

    const { password, ...rest } = updatedUser._doc

    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "You can delete only your account"))

  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, message: "User has been deleted" })
  } catch (error) {
    next(error)
  }
}
