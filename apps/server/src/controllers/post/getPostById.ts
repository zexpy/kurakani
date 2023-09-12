import { z } from 'zod'
import PostModel from '../../models/post.schema'
import { publicProcedure } from '../../libs/trpc'

export const getPostById = publicProcedure
    .input(z.string())
    .query(async opts => {
        return await PostModel.findById(opts.input).populate('userId')
    })
