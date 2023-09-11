import { z } from 'zod'
import { privateProcedure } from '../../utils/trpc'
import PostModel from '../../models/post.schema'

export const addPost = privateProcedure
    .input(
        z.object({
            image: z.string().optional(),
            content: z.string(),
            userId: z.string(),
        })
    )
    .mutation(async opts => {
        const newPost = new PostModel(opts.input)
        await newPost.save()
        return newPost.populate('userId')
    })
