import {
    loginUser,
    registerUser,
    getAllUser,
    updateUser,
} from '../controllers/user'
import { router } from '../libs/trpc'

export const userRouter = router({
    getAllUser,
    registerUser,
    loginUser,
    updateUser,
})
