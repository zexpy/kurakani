import { z } from "zod"
import { privateProcedure } from "../../libs/trpc"
import PostModel from "../../models/post.schema"

export const getFriendPost = privateProcedure.input(z.array(z.string())).query(async (opts) => {
    const posts = await PostModel.find({ _id: { $ne: opts.ctx.user?._id } })
        .populate("user_id")
        .sort({ createdAt: -1 })
    let newPost: any[] = []
    posts.map((post) => {
        // @ts-ignore
        if (opts.input.includes(post.user_id?._id.toString())) {
            newPost.push(post)
        }
    })

    return newPost
})
