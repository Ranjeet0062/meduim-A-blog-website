import { Hono } from "hono";
import { getCookie } from "hono/cookie";


export const auth = async (c:any,next:any) => {
    try {
        const token = getCookie(c, "token")
        console.log(",,,,,,,,,,,,,,,", token)
        if(!token){
            c.status(401)
            return c.json({
                success:false,
                message:"token is missing"
            })
        }
        next()
    }catch(error){
        console.log(error,"................")
        c.status(500)
        return c.json({
            success:false,
            message:"error in middlware"
        })
    }
}