import { NextFunction, Request,Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { AppError } from '../utils/appError'

export const authorizeRoles = (...roles:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if(!req.user){
            return next(new AppError("Unauthorised access",401))
        }

        if (!roles.includes(req.user.role)){
            return next(new AppError("Forbidden",403))
        }
        next()
    }
}