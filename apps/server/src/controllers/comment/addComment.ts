import { z } from "zod"
import { privateProcedure } from "../../libs/trpc"
import PostModel from "../../models/post.schema"
import CommentModel from "../../models/comment.schema"
import { TRPCError } from "@trpc/server"

export const addComment = privateProcedure
    .input(
        z.object({
            post_id: z.string(),
            content: z.string(),
        }),
    )
    .mutation(async (opts) => {
        try {
            const findPost = await PostModel.findById(opts.input.post_id)
            if (!findPost) {
                return
            }
            const newComment = new CommentModel({
                ...opts.input,
                user_id: opts.ctx.user?.id,
            })
            await newComment.save()
            findPost.comments.push(newComment.id)
            await findPost.save()
            return newComment.populate("user_id")
        } catch (error) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: (error as Error).message,
            })
        }
    })
