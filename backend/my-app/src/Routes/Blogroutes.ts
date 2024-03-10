import { PrismaClient } from '@prisma/client/edge'
import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'

export const  userRoute=new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>()

userRoute.post("/signup",async(c)=>{
    try{
        const {username,email,password}=await c.req.json()

        const prisma=new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
        }).$extends(withAccelerate());
        const user=await prisma.user.create({
            data:{
            username,
            password, 
            email
            }
        })
        c.status(200)
        return c.json({
            success:"true",
            data:user
        })

    }catch(error){
        console.log(`error accure in signup and error is ${error}`)
        c.status(500)
        return c.json({
            success:false,
            message:`something went wrong while signup the user and error is ${error}`
        })
    }
})
