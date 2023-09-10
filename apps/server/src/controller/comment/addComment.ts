import { z } from 'zod'
import { publicProcedure } from '../../utils/trpc'
import PostModel from '../../model/post.schema'
import CommentModel from '../../model/comment.schema'
import { TRPCError } from '@trpc/server'

export const addComment = publicProcedure
    .input(
        z
            .object({
                user_id: z.string(),
                post_id: z.string(),
                content: z.string(),
            })
            .required()
    )
    .mutation(async opts => {
        const { user_id, post_id, content } = opts.input

        try {
            const findPost = await PostModel.findById(post_id)

            if (!findPost) {
                return
            }

            const newComment = new CommentModel({
                user_id,
                post_id,
                content,
            })

            await newComment.save()
            findPost.comments.push(newComment.id)
            await findPost.save()
            return newComment
        } catch (error) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: (error as Error).message,
            })
        }
    })
