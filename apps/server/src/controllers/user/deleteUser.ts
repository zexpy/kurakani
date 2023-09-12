import { z } from 'zod'
import { publicProcedure } from '../../libs/trpc'
import { UserModel } from '../../models/user.schema'

export const deleteUser = publicProcedure
    .input(z.string())
    .mutation(async opts => {
        return await UserModel.findByIdAndDelete(opts.input)
    })
