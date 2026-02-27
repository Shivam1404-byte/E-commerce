import express from "express"
import {router} from "./routes/authRoute"
import { errorhandler } from "./middleware/errorMiddleware"

export const app = express()

app.use(express.json())

app.use('/auth',router)


app.get('/',(req,res)=>{
    res.json("App is running")
})
app.use(errorhandler)