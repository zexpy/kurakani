import { z } from "zod"
import { privateProcedure } from "../../libs/trpc"
import UserModel from "../../models/user.schema"

export const getFriendById = privateProcedure.input(z.string()).query(async ({ input }) => {
    return await UserModel.findById(input).populate("friends")
})
