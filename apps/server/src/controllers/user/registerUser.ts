import { z } from "zod"
import { publicProcedure } from "../../libs/trpc"
import UserModel from "../../models/user.schema"
import { TRPCError } from "@trpc/server"

export const registerUser = publicProcedure
    .input(
        z.object({
            email: z.string(),
            password: z.string(),
            username: z.string(),
        }),
    )
    .mutation(async (opts) => {
        const { email, password, username } = opts.input
        const user = await UserModel.findOne({ email })
        if (user) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Email already registered!",
            })
        }

        const newUser = new UserModel({
            email,
            password,
            username,
        })

        await newUser.save()
        return newUser
    })
