import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Role } from "../generated/prisma/enums";
import { add_cart } from "../services/cart/cart.service";

interface CustomRequest extends Request{
    user?:{id:string,role:Role}
}

export const addCart = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const userId = req.user?.id
    const {productId,quantity,storeId} = req.body

    const cart = await add_cart(productId,quantity,storeId,userId as string)

    res.status(200).json({cart})
})