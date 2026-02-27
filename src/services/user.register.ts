import {prisma} from '../db/prisma'
import bcrypt from 'bcrypt'
import { AppError } from '../utils/appError'

export const registerService = async(email:string,password:string)=>{
    if(!email || !password){
        throw new AppError("Email and password required",400)
    }

    const checkUser = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if (checkUser){
        throw new AppError("User already exist",401)
    }

    const password_hash = await bcrypt.hash(password,10)

    return await prisma.user.create({
        data:{
            email:email,
            password_hash:password_hash,
            role:"CONSUMER"
        }
    })
} 