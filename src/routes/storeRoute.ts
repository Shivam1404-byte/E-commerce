import  express  from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { create_store,get_store,update_store,delete_store } from "../controllers/storeController";
import { middleware } from "../middleware/middleware";
import { requireAdmin,checkVendor } from "../middleware/requireAdmin";

export const store_route = express.Router()


store_route.post('/create',middleware,requireAdmin,create_store)
store_route.get('/get',middleware,get_store)
store_route.put('/update/:id',middleware,update_store)
store_route.delete('/delete/:id',middleware,delete_store)
