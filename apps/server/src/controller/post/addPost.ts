import { z } from 'zod'
import { publicProcedure } from '../../utils/trpc'
import PostModel from '../../model/post.schema'
import mongoose from 'mongoose'

export const addPost = publicProcedure
    .input(
        z.object({
            image: z.string().optional(),
            content: z.string(),
            user_id: z.custom<mongoose.Types.ObjectId>(),
        })
    )
    .mutation(async opts => {
        const { image, content, user_id } = opts.input
        const newPost = new PostModel({
            image: image ?? '',
            content,
            user_id,
        })
        await newPost.save()
        console.log({ newPost })
        return newPost.populate('user_id')
    })
