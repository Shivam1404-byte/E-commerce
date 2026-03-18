import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Role } from "../generated/prisma/client"
import { createStore,getStore,updateStore,deleteStore,getAdminStore } from "../services/store/store.service";

interface CustomRequest extends Request {
  user?: { id: string , role:Role};
}

export const create_store = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const {name,email,password} = req.body
    const vendor_id = req.user?.id;

    const store = await createStore(name,email,password,vendor_id as string)

    res.status(200).json(store)
})

export const get_AdminStore = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const store = await getAdminStore()
    
    res.status(200).json(store)
})

export const get_store = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const vendor_id=req.user?.id

    const store = await getStore(vendor_id as string)

    res.json(store)
})

export const update_store = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const {id} = req.params
    const {name,status} = req.body
    const vendor_id=req.user?.id

    const result = await updateStore(id as string,vendor_id as string,name,status) 

    res.json(result)
})

export const delete_store = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const {id} = req.params
    const vendor_id = req.user?.id

    const result = await deleteStore(id as string, vendor_id as string)

    res.json(result)
})