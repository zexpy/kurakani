import { z } from "zod"
import { privateProcedure } from "../../libs/trpc"
import CommentModel from "../../models/comment.schema"
import PostModel from "../../models/post.schema"

export const deleteComment = privateProcedure
    .input(
        z.object({
            comment_id: z.string(),
            post_id: z.string(),
        }),
    )
    .mutation(async (opts) => {
        await Promise.all([
            CommentModel.findByIdAndDelete(opts.input.comment_id),
            PostModel.findByIdAndUpdate(opts.input.post_id, {
                $pull: { comments: opts.input.comment_id },
            }),
        ])
        return opts.input.comment_id
    })
