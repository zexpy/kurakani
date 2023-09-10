import { router } from '../utils/trpc'
import { addPost, getPostByUserId, getPostById } from '../controller/post'

export const postRouter = router({
    addPost,
    getPostByUserId,
    getPostById,
})
