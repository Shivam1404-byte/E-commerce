import { prisma } from "../src/db/prisma"
import bcrypt from "bcrypt"
import {config} from "dotenv"
config()
async function main(){
    const passwordEnv = process.env.ADMIN_PASSWORD as string

    if (!passwordEnv) {
      throw new Error("ADMIN_PASSWORD is not defined")
    }

    const email = process.env.ADMIN_EMAIL

    if (!email) throw new Error("ADMIN_EMAIL missing")

    const password = await bcrypt.hash(passwordEnv,10)
    const ADMIN = await prisma.user.upsert({
      where: { email: "shivamchn1111@gmail.com" },
      update: {},
      create: {
        email: email,
        password_hash: password,
        role: "ADMIN"
      }
    })

    console.log("Admin ensured in DB")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })