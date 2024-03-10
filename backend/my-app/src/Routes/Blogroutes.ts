import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

export const Blogroutes = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>()
Blogroutes.use("/*", async (c, next) => {
    try {
        const token = getCookie(c, "token")
        console.log(",,,,,,,,,,,,,,,", token)
        if (!token) {
            c.status(401)
            return c.json({
                success: false,
                message: "token is missing"
            })
        }
        const paylode = await verify(token, c.env.JWT_SECRET)
        console.log(paylode, "?///////////////////////")
        if (paylode) {
            c.set("userId", paylode.id);
            await next()
        } else {
            return c.json({
                message: "payloade is not fatched"
            })
        }
    } catch (e) {
        c.status(403);
        return c.json({
            message: "You are not logged in",
        });
    }
});
Blogroutes.post("/post", async (c) => {
    try {
        const user = c.get("userId")
        console.log(user)
        const { title, content } = await c.req.json()
        console.log(title, content, ";;;;;;;;;")
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());
        console.log("after accelerate")
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorid: user
            }
        })
        console.log("post", post)
        if (post) {
            c.status(200)
            return c.json({
                success: true,
                messagge: "blog posted successfully",
                data: post
            })
        } else {
            c.status(200)
            return c.json({
                success: false,
                message: "post does not create"
            })
        }
    } catch (error) {
        c.status(500)
        return c.json({
            success: false,
            message: `somthing went wrong while posting blog and error is ${error}`
        })
    }
})
Blogroutes.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });
  
    return c.json({
      blogs,
    });
  });
  
  Blogroutes.get("/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const blog = await prisma.post.findFirst({
        where: {
          id: String(id),
        },
        select: {
          id: true,
          title: true,
          content: true,
          author: {
            select: {
              username: true,
            },
          },
        },
      });
  
      return c.json({
        blog,
      });
    } catch (e) {
      c.status(411); // 4
      return c.json({
        message: "Error while fetching blog post",
      });
    }
  });
  
