import { z } from 'zod'
import { publicProcedure } from '../../utils/trpc'
import PostModel from '../../model/post.schema'
import mongoose from 'mongoose'

export const addPost = publicProcedure
    .input(
        z.object({
            image: z.string().optional(),
            content: z.string(),
            userId: z.custom<mongoose.Types.ObjectId>(),
        })
    )
    .mutation(async opts => {
        const newPost = new PostModel(opts.input)
        await newPost.save()
        return newPost.populate('userId')
    })
