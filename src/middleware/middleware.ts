import { Request,Response,NextFunction } from "express";


export const errorhandler = async(req:Request,res:Response,next:NextFunction,err:any)=>{
    console.log("ERROR",err)
    res.status(err.statusCode || 500).json({
        messages:err.message || "Internal Server Error"
    })
}