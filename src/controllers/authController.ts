import { Request,Response} from "express"
import { registerService } from "../services/user.register"
import { loginService } from "../services/user.login"
import  jwt  from 'jsonwebtoken'


export const register =  async(req:Request,res:Response)=>{
        const {email,password} = req.body

        const user = await registerService(email,password)

        res.status(201).json(user)
}

export const login = async(req:Request,res:Response)=>{
        const {email,password} = req.body
        const user = await loginService(email,password)

        const token = jwt.sign(
            {userId:user.id},
            process.env.JWT_SECRET!,
            {expiresIn:'1h'}
        )

        res.status(200).json(
            {Message:"Login Successfull",
                User: user,
                token: token
            }
        )
}