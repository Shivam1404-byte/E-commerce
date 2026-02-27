import {prisma} from '../db/prisma'
import bcrypt from 'bcrypt'
import { config } from 'dotenv'
config()

export const loginService = async (email:string,password:string)=>{
    const user = await prisma.user.findUnique({
        where:{email:email}
    })

    if(!user){
        throw new Error("Invalid Credentials E")
    }

    const checkPassword = await bcrypt.compare(password,user.password_hash)

    if(!checkPassword){
        throw new Error("Invalid Credetials P")
    }

    return user
}