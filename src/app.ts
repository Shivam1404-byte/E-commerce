import express from "express"
import {router} from "./routes/authRoute"
import { errorhandler } from "./middleware/errorMiddleware"
import { store_route } from "./routes/storeRoute"
import { productRoute } from "./routes/productRoute"
import { cartRoute } from "./routes/cartRoutes"

export const app = express()

app.use(express.json())

app.use('/auth',router)
app.use('/store',store_route)
app.use('/product',productRoute)
app.use('/cart',cartRoute)


app.get('/',(req,res)=>{
    res.json("App is running")
})
app.use(errorhandler)