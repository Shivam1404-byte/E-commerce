import express from "express"
import { createProduct,getProduct,updateProduct,deleteProduct } from "../controllers/productController"
import { middleware } from "../middleware/middleware"
import { checkVendor } from "../middleware/requireAdmin"

export const productRoute = express.Router()

productRoute.post('/create',middleware,createProduct)
productRoute.get('/get',middleware,getProduct)
productRoute.put('/update/:id',middleware,updateProduct)
productRoute.delete('/delete/:id',middleware,deleteProduct)