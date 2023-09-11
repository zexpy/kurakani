import { UserModel } from '../../model/user.schema'
import { publicProcedure } from '../../utils/trpc'

export * from './loginUser'
export * from './registerUser'
export * from './deleteUser'
export * from './updateUser'

export const getAllUser = publicProcedure.query(() => {
    return UserModel.find()
})
