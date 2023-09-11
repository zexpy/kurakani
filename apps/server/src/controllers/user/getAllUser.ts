import { UserModel } from '../../models/user.schema'
import { publicProcedure } from '../../utils/trpc'

export const getAllUser = publicProcedure.query(() => {
    return UserModel.find()
})
