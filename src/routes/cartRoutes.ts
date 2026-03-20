import express from "express"
import { middleware } from "../middleware/middleware"
import { addCart } from "../controllers/cartController"

export const cartRoute = express.Router()

cartRoute.post('/add',middleware,addCart)