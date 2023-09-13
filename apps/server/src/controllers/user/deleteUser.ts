import { z } from 'zod'
import { privateProcedure } from '../../libs/trpc'
import { UserModel } from '../../models/user.schema'

export const deleteUser = privateProcedure
    .input(z.string())
    .mutation(async opts => {
        return await UserModel.findByIdAndDelete(opts.input)
    })
