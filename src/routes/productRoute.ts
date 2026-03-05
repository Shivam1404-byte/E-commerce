import express from "express"
import { createProduct,getProduct,updateProduct,deleteProduct } from "../controllers/productController"
import { middleware } from "../middleware/middleware"
import { authorizeRoles } from "../middleware/authorizeRoles"

export const productRoute = express.Router()

productRoute.post('/create',middleware,authorizeRoles("VENDOR"),createProduct)
productRoute.get('/get',middleware,getProduct)
productRoute.put('/update/:id',middleware,updateProduct)
productRoute.delete('/delete/:id',middleware,deleteProduct)