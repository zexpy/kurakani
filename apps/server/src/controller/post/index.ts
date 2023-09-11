import { z } from 'zod'
import PostModel from '../../model/post.schema'
import { publicProcedure } from '../../utils/trpc'

export * from './addPost'

export const getPostById = publicProcedure
    .input(z.string())
    .query(async opts => {
        return await PostModel.findById(opts.input).populate('userId')
    })

export const getPostByUserId = publicProcedure
    .input(z.string())
    .query(async opts => {
        return await PostModel.find({ user_id: opts.input })
            .populate('user_id')
            .populate({ path: 'comments', select: ['content', 'userId'] })
    })
