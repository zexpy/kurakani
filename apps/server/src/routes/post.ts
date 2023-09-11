import { router } from '../utils/trpc'
import { addPost, getPostByUserId, getPostById } from '../controllers/post'

export const postRouter = router({
    addPost,
    getPostByUserId,
    getPostById,
})
