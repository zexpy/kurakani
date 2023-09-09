import { getUser } from '../controller/getUser'
import { router } from '../lib/trpc'

export const userRouter = router({ getUser })
