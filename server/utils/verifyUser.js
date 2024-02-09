import jwt from "jsonwebtoken"
import { errorHandler } from "./errorHandler.js"

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token

  if (!token) return next(errorHandler(401, "You should signin first"))

  jwt.verify(token, process.env.SECURITY_KEY, (err, user) => {
    if (err) return next(errorHandler(403, "Token is not valid"))

    req.user = user
    next()
  })
}
