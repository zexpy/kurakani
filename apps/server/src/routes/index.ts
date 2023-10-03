import { userRouter } from "./user"
import { mergerRouters } from "../libs/trpc"
import { postRouter } from "./post"
import { commmentRouter } from "./comment"
import { chatRouter } from "./chat"
import { messageRouter } from "./message"

export const appRouter = mergerRouters(
    userRouter,
    postRouter,
    commmentRouter,
    chatRouter,
    messageRouter,
)

export type AppRouter = typeof appRouter
