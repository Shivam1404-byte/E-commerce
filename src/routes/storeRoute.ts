import  express  from "express";
import { create_store,get_store,update_store,delete_store,get_AdminStore } from "../controllers/storeController";
import { middleware } from "../middleware/middleware";
import { authorizeRoles } from "../middleware/authorizeRoles";

export const store_route = express.Router()

store_route.post('/Admin/create',middleware,authorizeRoles("ADMIN"),create_store)
store_route.get('/Admin/store',middleware,authorizeRoles("ADMIN"),get_AdminStore)
store_route.delete('/Admin/delete/:id',middleware,authorizeRoles("ADMIN"),delete_store)

store_route.get('/Vendor/store',middleware,authorizeRoles("VENDOR"),get_store)
store_route.put('/Vendor/update/:id',middleware,authorizeRoles("VENDOR"),update_store)