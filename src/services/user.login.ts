import {prisma} from '../db/prisma'
import bcrypt from 'bcrypt'

type User={
    id:string,
    email:string
}

export const loginService = async (email:string,password:string): Promise<User>=>{
    
    if(!email || !password){
        throw new Error("Email and password required")
    }

    const user = await prisma.user.findUnique({
        where:{email:email}
    })

    if (!user){
        throw new Error("Invalid credentials U")
    }

    const checkPassword = await bcrypt.compare(password,user.password_hash)

    if(!checkPassword){
        throw new Error("Invalid Credetials P")
    }

    return {
        id: user.id,
        email: user.email,
}
}