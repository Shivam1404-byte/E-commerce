import {prisma} from "../../db/prisma"
import { AppError } from '../../utils/appError'
import { Status } from "../../generated/prisma/client"

type Store={
    id:string,
    name:string
}

export const createStore = async(name:string,id:string): Promise<Store> =>{
    if (!name){
        throw new AppError("Name required!",401)
    }
    
    const checkStore = await prisma.store.findMany({
        where:{
            id:id
        }
    })

    if(!checkStore){
        throw new AppError("Store already exist",401)
    }

    const store = await prisma.store.create({
        data:{
            name:name,
            vendor_id:id
        }
    })

    return store
}

type getStore={
    id:string,
    name:string,
    status:Status,

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
            name:name,
            status:status
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
            is_deleted:true
        }
    })

    return {Message:"Delete succesfully"}
}