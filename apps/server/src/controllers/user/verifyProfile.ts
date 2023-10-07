import UserModel from "../../models/user.schema"
import { publicProcedure } from "../../libs/trpc"
import { z } from "zod"

export const verifyProfile = publicProcedure
    .input(
        z.object({
            id: z.string(),
            update: z
                .object({
                    firstName: z.string(),
                    lastName: z.string(),
                    address: z.string(),
                    profile_pic: z.string(),
                })
                .partial(),
        }),
    )
    .mutation(async (opts) => {
        return await UserModel.findByIdAndUpdate(opts.input.id, opts.input.update, {
            new: true,
        })
    })
