import { z } from "zod"
import { privateProcedure } from "../../libs/trpc"
import PostModel from "../../models/post.schema"

export const updateLike = privateProcedure
    .input(
        z.object({
            post_id: z.string(),
        }),
    )
    .mutation(async (opts) => {
        const post = await PostModel.findById(opts.input.post_id)
        if (post?.likes?.includes(opts.ctx.user?.id)) {
            await PostModel.findByIdAndUpdate(opts.input.post_id, {
                $pull: { likes: opts.ctx.user?._id },
            })
        } else {
            await PostModel.findByIdAndUpdate(opts.input.post_id, {
                $push: { likes: opts.ctx.user?._id },
            })
        }
    })
