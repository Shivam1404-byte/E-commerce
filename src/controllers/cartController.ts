import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Role } from "../generated/prisma/enums";
import { add_cart, delete_cart, get_cart, update_cart } from "../services/cart/cart.service";

interface CustomRequest extends Request{
    user?:{id:string,role:Role}
}

export const addCart = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const userId = req.user?.id
    const {productId,quantity,storeId} = req.body

    const cart = await add_cart(productId,quantity,storeId,userId as string)

    res.status(200).json({cart})
})

export const getCart = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const userId = req.user?.id
    const {storeId} = req.body

    const cart = await get_cart(storeId,userId as string)

    res.status(200).json({cart})
})

export const updateCart = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const userId = req.user?.id
    const {productId,quantity,storeId} = req.body
    const {id} = req.params

    const cart = await update_cart(productId,storeId,userId as string,id as string,quantity)

    res.status(200).json({
        Message:"Updated successfully",
        cart
    })
})

export const deleteCart = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const userId = req.user?.id
    const {storeId} = req.body

    const cart = await delete_cart(storeId,userId as string)

    res.status(200).json({
        Message:"Cart deleted successfully",
        cart
    })
})