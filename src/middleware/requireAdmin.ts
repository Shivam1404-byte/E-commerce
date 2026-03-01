import { NextFunction, Request,Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { AppError } from '../utils/appError'



export const requireAdmin = asyncHandler(async (req:Request,res:Response,next:NextFunction) => {
    if (req.user?.role != "ADMIN"){
        throw new AppError("Unauthorised access",403)
    }
    next()
})

export const checkVendor = asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    if (req.user?.role != "VENDOR"){
        throw new AppError("Require Vendor",403)
    }
    next()
})