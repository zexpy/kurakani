import { UserModel } from '../../models/user.schema'
import { privateProcedure } from '../../utils/trpc'

export const getAllUser = privateProcedure.query(async () => {
    return await UserModel.find()
})
