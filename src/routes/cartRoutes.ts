import express from "express"
import { middleware } from "../middleware/middleware"
import { addCart, deleteCart, getCart, updateCart } from "../controllers/cartController"

export const cartRoute = express.Router()

cartRoute.post('/add',middleware,addCart)
cartRoute.get('/get',middleware,getCart)
cartRoute.delete('/delete/:id',middleware,deleteCart)
cartRoute.put('/update/:id',middleware,updateCart)