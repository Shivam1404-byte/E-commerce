import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Role } from "../generated/prisma/enums";
import { create_Category } from "../services/product/category.service";

interface CustomRequest extends Request{
    user?:{id:string,role:Role}
}

export const createCategory = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const {name} = req.body

    const category = create_Category(name)

    res.status(200).json({Message:"category added"})
})