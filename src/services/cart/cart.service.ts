import {prisma} from "../../db/prisma"
import { AppError } from "../../utils/appError"

export const add_cart = async(productId:string,quantity:number,storeId:string,id:string)=>{
    const product = await prisma.product.findFirst({
        where:{id:productId,store_id:storeId}
    })

    if (!product) throw new Error("Product not found in this store")
    if (product.stock < quantity) throw new Error("Insufficient stock")

    const cart = await prisma.$transaction(async(tx)=>{
        let cart = await tx.cart.findFirst({
            where:{
                user_id:id,
                status:"ACTIVE",
                store_id:storeId
            }
        })

        if(!cart){
            cart = await tx.cart.create({
                data:{
                    store_id:storeId,
                    user_id:id
                }
            }) 
        }

        const existing = await tx.cartItem.findFirst({
            where:{
                cart_id:cart.id,
                product_id:productId
            }
        })

        if(existing){
           await tx.cartItem.update({
            where:{
                id:existing.id
            },
            data:{
                quantity:{
                    increment:quantity
                }
            }
           }) 
        }

        else{
            await tx.cartItem.create({
                data:{
                    cart_id:cart.id,
                    product_id:productId,
                    quantity:quantity,
                    price:product.id
                }
            })
        }

        return cart
    })
}