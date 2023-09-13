import { z } from 'zod'
import PostModel from '../../models/post.schema'
import { privateProcedure } from '../../libs/trpc'

export const getPostByUserId = privateProcedure
    .input(z.string())
    .query(async opts => {
        return await PostModel.find({ userId: opts.input })
            .populate('userId')
            .populate({ path: 'comments', select: ['content', 'userId'] })
    })
