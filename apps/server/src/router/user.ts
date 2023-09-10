import {
    loginUser,
    registerUser,
    getAllUser,
    updateUser,
} from '../controller/user'
import { router } from '../utils/trpc'

export const userRouter = router({
    getAllUser,
    registerUser,
    loginUser,
    updateUser,
})
