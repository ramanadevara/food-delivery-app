import express from "express"

import {
  addToCart,
  removeFromCart,
  viewCart,
} from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js"

const cartRouter = express.Router()

cartRouter.post("/add", authMiddleware, addToCart)

cartRouter.post("/remove", authMiddleware, removeFromCart)

cartRouter.post("/view", authMiddleware, viewCart)

export default cartRouter
