import { router } from '../utils/trpc'
import { addComment } from '../controllers/comment'

export const commmentRouter = router({
    addComment,
})
