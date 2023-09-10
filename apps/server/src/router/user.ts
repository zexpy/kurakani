import { getUser } from '../controller/getUser'
import { router } from '../utils/trpc'

export const userRouter = router({ getUser })
