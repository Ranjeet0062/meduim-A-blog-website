import { Hono } from 'hono'
import { userRoute } from './Routes/Blogroutes'
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.route("/api/v1/user",userRoute)
export default app
