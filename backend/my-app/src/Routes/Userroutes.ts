import { PrismaClient } from '@prisma/client/edge'
import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { setCookie } from 'hono/cookie'
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
userRoute.post("/signin",async(c)=>{
    try{
        const {username,password}=await c.req.json()
        const prisma=new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
        }).$extends(withAccelerate())
    const user=await prisma.user.findFirst({
        where:{
            username
        }
    })
    if(user){
        const jwt=await sign({
            id:user.id,
            username:user.username
        },c.env.JWT_SECRET)
        setCookie(c,"token",jwt)
        c.status(200)
        return c.json({
            success:true,
            message:`login successfully`,
            data:user
        })
    }else{
        c.status(401)
        return c.json({
            success:false,
            message:`user does not found`
        })
    }
    }catch(error){
        c.status(500)
        return c.json({
            success:false,
            mesage:`somthing went wrong while signin and error is ${error}`
        })
    }

})
