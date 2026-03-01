import { prisma } from "../src/db/prisma"
import bcrypt from "bcrypt"
import {config} from "dotenv"
config()
async function main(){
    const passwordEnv = process.env.ADMIN_PASSWORD as string
    const password = await bcrypt.hash(passwordEnv,10)
    const ADMIN = await prisma.user.create({
        data:{
            email:"shivamchn1111@gmail.com",
            password_hash:password,
            role:"ADMIN"
        }
    })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })