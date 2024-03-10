import { Hono } from 'hono'
import { userRoute } from './Routes/Userroutes'
import { auth } from './Routes/Middelware'
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.route("/api/v1/user",userRoute)
app.get("/hello",auth,(c)=>{
  c.status(200)
  return c.json({
    success:true
  })
})
export default app
