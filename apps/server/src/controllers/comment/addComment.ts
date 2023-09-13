import { z } from 'zod'
import { privateProcedure } from '../../libs/trpc'
import PostModel from '../../models/post.schema'
import CommentModel from '../../models/comment.schema'
import { TRPCError } from '@trpc/server'

export const addComment = privateProcedure
    .input(
        z.object({
            userId: z.string(),
            postId: z.string(),
            content: z.string(),
        })
    )
    .mutation(async opts => {
        try {
            const findPost = await PostModel.findById(opts.input.postId)

            if (!findPost) {
                return
            }

            const newComment = new CommentModel(opts.input)

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
