import { router } from '../utils/trpc'
import { addComment } from '../controller/comment'

export const commmentRouter = router({
    addComment,
})
