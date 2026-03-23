import { Request,Response,NextFunction } from "express";
import { AppError } from "../utils/appError";


export const errorhandler = async(err:any,req:Request,res:Response,next:NextFunction)=>{
    if (err instanceof AppError){
        return res.status(err.statusCode).json({Message:err.message})
    }
    console.log(err)
    return res.status(err.statusCode || 500).json({Error:"Internal Server Error"})
}