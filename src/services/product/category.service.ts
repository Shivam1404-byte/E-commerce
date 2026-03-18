import {prisma} from "../../db/prisma"
import { AppError } from "../../utils/appError"

export const create_Category = async(name:string)=>{
    if(!name){
        throw new AppError("Name required",402)
    }

    const category = await prisma.category.create({
        data:{
            name:name
        }
    })

    return category
}