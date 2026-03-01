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
    const token = req.headers['authorization']?.split(' ')[1]

    if(!token || !token.startsWith("Bearer ")){
        throw new AppError("Token not provided",401)
    }

    let decoded
    try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
  } catch (err) {
    throw new AppError( "Invalid or expired token",401)
  }
    const user = await prisma.user.findUnique({
        where:{id:decoded.id}
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