import { z } from "zod"
import PostModel from "../../models/post.schema"
import { privateProcedure } from "../../libs/trpc"

export const getPostById = privateProcedure.input(z.string()).query(async (opts) => {
    return await PostModel.findById(opts.input).populate("user_id")
})
