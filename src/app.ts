import express from "express"
import {router} from "./routes/authRoute"
import { errorhandler } from "./middleware/errorMiddleware"
import { store_route } from "./routes/storeRoute"
import { productRoute } from "./routes/productRoute"
import { cartRoute } from "./routes/cartRoutes"
import { orderRoute } from "./routes/orderRoute"

export const app = express()

app.use(express.json())

app.use('/auth',router)
app.use('/store',store_route)
app.use('/product',productRoute)
app.use('/cart',cartRoute)
app.use('/',orderRoute)

app.get('/',(req,res)=>{
    res.json("App is running")
})
app.use(errorhandler)