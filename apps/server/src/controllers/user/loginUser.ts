import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { publicProcedure } from '../../utils/trpc'
import { UserModel } from '../../models/user.schema'

export const loginUser = publicProcedure
    .input(
        z.object({
            email: z.string(),
            password: z.string(),
        })
    )
    .mutation(async opts => {
        const { email, password } = opts.input
        const user = await UserModel.findOne({ email }).select('email password')
        if (!user) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'User not found!',
            })
        }

        if (user.password !== password) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Incorrect Password!',
            })
        }
        return user
    })
