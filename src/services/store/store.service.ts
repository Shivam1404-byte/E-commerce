import {prisma} from "../../db/prisma"
import { AppError } from '../../utils/appError'
import { Status } from "../../generated/prisma/client"
import bcrypt from "bcrypt"

type Store={
    id:string,
    name:string
}

export const createStore = async(name:string,email:string,password:string,id:string): Promise<Store> =>{
    if (!name){
        throw new AppError("Name required!",401)
    }

    if (!email || !password){
        throw new AppError("Email and password required",401)
    }
    
    const checkStore = await prisma.store.findMany({
        where:{
            id:id
        }
    })

    const passwordHash = await bcrypt.hash(password,10)

    if(!checkStore){
        throw new AppError("Store already exist",401)
    }

    const store = await prisma.$transaction(async (tx)=>{
        let user = await tx.user.findUnique({
            where:{email:email}
        }) 

        if(user){
            throw new AppError("User already exist",400)
        }

        const createUser = await tx.user.create({
            data:{
                email:email,
                password_hash:passwordHash,
                role:"VENDOR"
            }
        })

        const store = await tx.store.create({
            data:{
                name:name,
                vendor_id:createUser.id,
                status:"APPROVED"
            }
        })

        return store
    })

    return store
}

type getStore={
    id:string,
    name:string,
    status:Status,

}

export const getAdminStore = async ()=>{
    
    const stores = await prisma.store.findMany({
    include: {
    vendor: {
        select: {
        id: true,
        email: true
        }
    }
    }
    })
    return stores
}

export const getStore = async(vendor_id:string): Promise<getStore> =>{
    const store = await prisma.store.findFirst({
        where:{
            vendor_id:vendor_id,
            is_deleted:false
        }
    })

    return store as getStore
}

export const updateStore = async(id:string,vendor_id:string,name:string,status:Status)=>{
    const Store = await prisma.store.findUnique({
        where:{
            id:id,
            vendor_id:vendor_id,
            is_deleted:false
        }
    })
    
    if(!Store){
        throw new AppError("Store not found",401)
    }

    await prisma.store.update({
        where:{id:id,vendor_id:vendor_id},
        data:{
            name:name
        }
    })

    return {Message:"Updated successfully"}
}

export const deleteStore = async(id:string,vendor_id:string)=>{
    const Store = await prisma.store.findUnique({
        where:{
            id:id,
            vendor_id:vendor_id
        }
    })

    if(!Store){
        throw new AppError("Store not found",401)
    }

    await prisma.store.update({
        where:{id:id,vendor_id:vendor_id},
        data:{
            status:"SUSPENDED",
            is_deleted:true
        }
    })

    return {Message:"Delete succesfully"}
}