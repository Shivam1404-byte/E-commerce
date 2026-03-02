import {prisma} from "../../db/prisma"
import { AppError } from "../../utils/appError"

export const create_product = async(name:string,description:string,stock:number,price:number,id:string)=>{
    if(!name){
        throw new AppError("Name required",401)
    }
    if(!description){
        throw new AppError("description required",401)
    }
    if (stock < 0) throw new AppError("Invalid stock", 400)
    if (price < 0) throw new AppError("Invalid price", 400)

    const store = await prisma.store.findFirst({
        where:{vendor_id:id}
    })
    
    if(!store){
        throw new AppError("Store not found",401)
    }
    const product = await prisma.product.create({
        data:{
            name:name,
            descriptions:description,
            stock:stock,
            price:price,
            store_id:store.id
        }
    })
    return product
}

export const get_product = async(id:string)=>{
    const store = await prisma.store.findFirst({
        where:{vendor_id:id}
    })

    if(!store){
        throw new AppError("Store not found",401)
    }

    const products = await prisma.product.findMany({
        where:{
            store_id:store.id,
            is_deleted:false
        }
    })

    if(!products){
        throw new AppError("No product found",404)
    }

    return products
}

export const update_product = async(productId:string,name:string,description:string,stock:number,price:number,id:string)=>{
    const store = await prisma.store.findFirst({
        where:{vendor_id:id}
    })

    if(!store){
        throw new AppError("Store not found",401)
    }

    const checkProduct = await prisma.product.findUnique({
        where:{
            id:productId,
            store_id:store.id
        }
    })

    if (!checkProduct){
        throw new AppError("Product not found",404)
    }

    const updateProduct = await prisma.product.update({
        where:{id:productId,store_id:store.id},
        data:{
            name:name,
            descriptions:description,
            stock:stock,
            price:price
        }
    })

    return updateProduct
}

export const delete_product = async(id:string,productId:string)=>{
    const store = await prisma.store.findFirst({
        where:{vendor_id:id}
    })

    if(!store){
        throw new AppError("Store not found",401)
    }

    const checkProduct = await prisma.product.findUnique({
        where:{
            id:productId,
            store_id:store.id
        }
    })

    if (!checkProduct){
        throw new AppError("Product not found",404)
    }

    await prisma.product.update({
        where:{id:productId,store_id:store.id},
        data:{
            is_deleted:true
        }
    })

    return ({Message:"Product Delete Successfully"})
}