import { UserModel } from '../../model/user.schema'
import { publicProcedure } from '../../utils/trpc'
import { z } from 'zod'

export const updateUser = publicProcedure
    .input(
        z.object({
            id: z.string().readonly(),
            update: z
                .object({
                    username: z.string(),
                    password: z.string(),
                })
                .partial(),
        })
    )
    .mutation(async opts => {
        return await UserModel.findByIdAndUpdate(
            opts.input.id,
            {
                ...opts.input.update,
                updated_at: new Date(),
            },
            { new: true }
        )
    })
