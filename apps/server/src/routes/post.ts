import { router } from "../libs/trpc"
import {
    updatePost,
    addPost,
    getPostByUserId,
    getPostById,
    getFriendPost,
} from "../controllers/post"

export const postRouter = router({
    addPost,
    getPostByUserId,
    getPostById,
    getFriendPost,
    updatePost,
})
