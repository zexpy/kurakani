import { z } from "zod"
import { privateProcedure } from "../../libs/trpc"
import PostModel from "../../models/post.schema"

export const updatePost = privateProcedure
    .input(
        z.object({
            post_id: z.string(),
            updates: z.object({
                likes_count: z.number() || z.string(),
                comments: z.array(z.string()).optional(),
            }),
        }),
    )
    .mutation(async (opts) => {
        const post = await PostModel.findByIdAndUpdate(opts.input.post_id, opts.input.updates, {
            new: true,
        })

        return post
    })
