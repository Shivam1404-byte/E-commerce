import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Role } from "@prisma/client";
import {place_order} from "../services/Order/order.service"

interface CustomRequest extends Request{
    user?:{id:string,role:Role}
}

export const placeOrder = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const userId = req.user?.id
    const {idempotency_key,storeId} = req.body

    const order = place_order(userId as string,idempotency_key,storeId)

    res.json(order)
})