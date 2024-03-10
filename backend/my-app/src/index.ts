import { Hono } from 'hono'
import { userRoute } from './Routes/Userroutes'
import { auth } from './Routes/Middelware'
import { Blogroutes } from './Routes/Blogroutes'
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.route("/api/v1/user",userRoute)
app.route("/api/v1/blog",Blogroutes)
export default app
