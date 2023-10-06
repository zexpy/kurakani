import { router } from "../libs/trpc"
import { addComment, deleteComment } from "../controllers/comment"

export const commmentRouter = router({
    addComment,
    deleteComment,
})
