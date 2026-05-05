import  express  from "express";
import { middleware } from "../middleware/middleware";
import { placeOrder } from "../controllers/orderController";

export const orderRoute = express.Router()

orderRoute.post('/order',middleware,placeOrder)