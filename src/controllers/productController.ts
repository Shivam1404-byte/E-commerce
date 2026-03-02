import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Role } from "../generated/prisma/enums";
import { create_product, delete_product, get_product, update_product } from "../services/product/product.service";

interface CustomRequest extends Request{
    user?:{id:string,role:Role}
}

export const createProduct = async(req:CustomRequest,res:Response)=>{
    const {name,description,stock,price} = req.body
    const userId = req.user?.id as string
    
    const product = await create_product(name,description,stock,price,userId)
    
    res.json(product)
}

export const getProduct = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const userId = req.user?.id as string

    const product = await get_product(userId)

    res.json(product)
})

export const updateProduct = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const {name,description,stock,price} = req.body
    const userId = req.user?.id as string
    const {id} = req.params

    const product = await update_product(id as string,name,description,stock,price,userId)

    res.json({
        "Message":"Updated successfully",
        Product:product
    })
})

export const deleteProduct = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const {id} = req.params
    const userId = req.user?.id

    const product = await delete_product(userId as string,id as string)

    res.json(product)
})  