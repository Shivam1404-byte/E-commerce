import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Role } from "../generated/prisma/enums";

interface CustomRequest extends Request{
    user?:{id:string,role:Role}
}

const placeOrder = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const userId = req.user?.id
    const {idempotency_key,storeId} = req.body


})