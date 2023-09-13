import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { publicProcedure } from '../../libs/trpc'
import { UserModel } from '../../models/user.schema'
import { signAccessToken } from '../../libs/auth'

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

        // @ts-ignore
        const valid = await user.isValidPassword(password)
        if (!valid) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Incorrect Password!',
            })
        }

        const token = signAccessToken({ id: user.id, email: user.email })

        return {
            jwt: token,
            user: { ...user },
        }
    })
