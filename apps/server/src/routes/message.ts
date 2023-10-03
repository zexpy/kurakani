import { router } from "../libs/trpc"
import { allMessage, sendMessage } from "../controllers/message"

export const messageRouter = router({
    sendMessage,
    allMessage,
})
