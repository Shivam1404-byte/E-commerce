import {prisma} from "../../db/prisma"
import { AppError } from "../../utils/appError"

const place_oreder = async(userId:string,idempotency_key:string,storeId:string)=>{
    await prisma.$transaction(async(tx)=>{
        const cart = await tx.cart.findUnique({
            where:{
                user_id_store_id:{
                    user_id:userId,
                    store_id:storeId
                }
            },
            include:{
                cartItems:true
            }
        })
    })
}