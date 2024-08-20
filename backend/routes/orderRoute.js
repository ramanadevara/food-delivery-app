import express from "express"
import {
  changeOrderStatus,
  listOrders,
  placeOrder,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js"
import authMiddleware from "../middleware/auth.js"

const orderRouter = express.Router()

orderRouter.post("/place", authMiddleware, placeOrder)

orderRouter.post("/verify", verifyOrder)

orderRouter.post("/userOrders", authMiddleware, userOrders)

orderRouter.get("/list", listOrders)

orderRouter.post("/change", changeOrderStatus)

export default orderRouter
