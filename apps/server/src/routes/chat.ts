import { router } from "../libs/trpc"
import { sendMessage, getChats, accessChat } from "../controllers/chat"

export const chatRouter = router({
    sendMessage,
    getChats,
    accessChat,
})
