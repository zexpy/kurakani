import { z } from "zod"
import { privateProcedure } from "../../libs/trpc"
import PostModel from "../../models/post.schema"

export const deletePostById = privateProcedure
    .input(
        z.object({
            postId: z.string(),
        }),
    )
    .mutation(async (opts) => {
        return await PostModel.findByIdAndDelete(opts.input.postId)
    })
