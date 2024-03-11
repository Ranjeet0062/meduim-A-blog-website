import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: {blog: Blog}) => {
    return <div>
        <Appbar authorName={blog.author.name} />
        <div className="flex justify-center">
            <div className="px-10 w-full pt-200 pt-12 flex flex-col-reverse lg:flex-row">
                <div className=" w-[95%] lg:w-[70%]">
                    <div className="text-2xl md:text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 2nd December 2023
                    </div>
                    <div className="pt-4 text-justify" style={{ whiteSpace: 'pre-wrap' }}>
                        {blog.content}
                    </div>
                </div>
                <div className="lg:w-[30%] mb-5 mx-3">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full items-start pt-5">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>  
                </div>
                
            </div>
        </div>
    </div>
}