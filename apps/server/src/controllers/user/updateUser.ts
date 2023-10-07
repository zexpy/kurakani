import UserModel from "../../models/user.schema"
import { publicProcedure } from "../../libs/trpc"
import { z } from "zod"

export const updateUser = publicProcedure
    .input(
        z.object({
            id: z.string().optional(),
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
        return await UserModel.findByIdAndUpdate(opts.input.id, opts.input.update, {
            new: true,
        })
    })
