import { router } from "../libs/trpc"
import { addComment } from "../controllers/comment"

export const commmentRouter = router({
    addComment,
})
