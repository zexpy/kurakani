import { z } from 'zod'
import { UserModel } from '../../models/user.schema'
import { privateProcedure } from '../../utils/trpc'

export const getUserById = privateProcedure
    .input(z.string())
    .query(async opts => {
        return await UserModel.findById(opts.input)
    })
