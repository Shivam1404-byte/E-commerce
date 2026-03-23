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
                    increment:quantity,
                },
                price:quantity * Number(product.price)
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

export const get_cart = async(storeId:string,id:string)=>{
    const product = await prisma.cart.findMany({
        where:{store_id:storeId,user_id:id},
        include:{
            cartItems:{
                include:{
                    product:true
                }
            }
        }
    })

    return product
}

export const update_cart = async(productId:string,storeId:string,id:string,cartId:string,quantity:number)=>{
    const product = await prisma.product.findFirst({
        where:{id:productId,store_id:storeId}
    })
    if (!product) throw new Error("Product not found in this store")
    if (product.stock < quantity) throw new Error("Insufficient stock")

    let cart = await prisma.cart.findFirst({
        where:{
            id:cartId,
            user_id:id,
            status:"ACTIVE",
            store_id:storeId
        }
    })

    if(!cart){
        throw new AppError("Cart not found",404)
    }

    const existing = await prisma.cartItem.findFirst({
            where:{
                cart_id:cart.id
            }
        })

    if(!existing){
        throw new AppError("CartItem does not found",404)
    }

    await prisma.cartItem.update({
            where:{
                id:existing.id
            },
            data:{
                quantity:{
                    increment:quantity,
                },
                price:quantity * Number(product.price)
            }
           })
}

export const delete_cart = async(storeId:string,id:string)=>{
    const cart = await prisma.cart.update({
        where:{
            user_id_store_id: {
                user_id: id,
                store_id: storeId
            }},
        data: {
            cartItems: {
            deleteMany: {}
            },
            status: "CHECKED_OUT"}
        })

    return cart
}
