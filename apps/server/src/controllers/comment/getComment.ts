import { z } from "zod"
import { privateProcedure } from "../../libs/trpc"
import PostModel from "../../models/post.schema"

export const getComment = privateProcedure.input(z.string()).query(async (opts) => {
    return PostModel.findById(opts.input).populate("comments")
})
