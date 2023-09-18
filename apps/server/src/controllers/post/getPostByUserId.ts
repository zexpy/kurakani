import { z } from "zod"
import PostModel from "../../models/post.schema"
import { privateProcedure } from "../../libs/trpc"

export const getPostByUserId = privateProcedure.input(z.string()).query(async (opts) => {
    return await PostModel.find({ user_id: opts.input })
        .populate({
            path: "comments",
            select: ["content", "userId"],
        })
        .sort({ createdAt: -1 })
        .exec()
})
