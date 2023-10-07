import UserModel from "../../models/user.schema"
import { privateProcedure } from "../../libs/trpc"
import { z } from "zod"

export const updateUser = privateProcedure
    .input(
        z.object({
            id: z.string().readonly().optional(),
            update: z
                .object({
                    username: z.string(),
                    password: z.string(),
                    profile_pic: z.string(),
                    email: z.string(),
                    address: z.string(),
                })
                .partial(),
        }),
    )
    .mutation(async (opts) => {
        return await UserModel.findByIdAndUpdate(opts.ctx.user?.id, opts.input.update, {
            new: true,
        })
    })
