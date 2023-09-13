import { UserModel } from '../../models/user.schema'
import { publicProcedure } from '../../libs/trpc'

export const getAllUser = publicProcedure.query(() => {
    return UserModel.find()
})