import { router } from "../libs/trpc"
import { getChats, accessChat } from "../controllers/chat"

export const chatRouter = router({
    getChats,
    accessChat,
})
