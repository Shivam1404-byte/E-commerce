import express from "express"
import { createProduct,getProduct,updateProduct,deleteProduct } from "../controllers/productController"
import { middleware } from "../middleware/middleware"
import { authorizeRoles } from "../middleware/authorizeRoles"
import { createCategory } from "../controllers/categoryController"

export const productRoute = express.Router()

productRoute.post('/create',middleware,authorizeRoles("VENDOR"),createProduct)
productRoute.get('/get',middleware,getProduct)
productRoute.put('/update/:id',middleware,authorizeRoles("VENDOR"),updateProduct)
productRoute.delete('/delete/:id',middleware,authorizeRoles("VENDOR"),deleteProduct)
productRoute.post('/category',middleware,authorizeRoles("VENDOR"),createCategory)