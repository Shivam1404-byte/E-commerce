import jwt from "jsonwebtoken"
import {prisma} from "../db/prisma"
import { config } from "dotenv"
import { NextFunction, Request, Response } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import { AppError } from "../utils/appError"
import { Role } from "../generated/prisma/client"
config()

declare global{
  namespace Express {
    interface Request {
      user?: { id: string; role:Role}
    }
  }
}


export const middleware = asyncHandler(async(req:Request,res:Response,next:NextFunction) =>{
    const authHeader = req.headers['authorization']
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new AppError("Token not provided",401)
    }
    const token = authHeader.split(" ")[1]
    
    let decoded
    try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    } catch (err) {
    throw new AppError("Invalid or expired token", 401)
    }
    const user = await prisma.user.findUnique({
        where:{id:decoded.userId as string}
    })
    if(!user){
        throw new AppError("User not Found",401)
    }

    req.user = {
      id: user.id,
      role: user.role
    }

    next()
} )