import {prisma} from '../../db/prisma'
import bcrypt from 'bcrypt'
import { AppError } from '../../utils/appError'

type User={
    id:string,
    email:string
}

export const loginService = async (email:string,password:string): Promise<User>=>{
    
    if(!email || !password){
        throw new AppError("Email and password required",401)
    }

    const user = await prisma.user.findUnique({
        where:{email:email}
    })

    if (!user){
        throw new AppError("Invalid Credentials!",400)
    }

    const checkPassword = await bcrypt.compare(password,user.password_hash)

    if(!checkPassword){
        throw new AppError("Invalid Credentials ",401)
    }

    return {
        id: user.id,
        email: user.email,
}
}