import express from "express"
import {
  deleteUser,
  test,
  updateUser,
} from "../controllers/user.controllers.js"
import { isAuthenticated } from "../utils/verifyUser.js"

const router = express.Router()

router.get("/", test)

router.put("/update/:id", isAuthenticated, updateUser)
router.delete("/delete/:id", isAuthenticated, deleteUser)

export default router
