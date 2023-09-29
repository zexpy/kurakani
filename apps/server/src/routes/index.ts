import { userRouter } from "./user"
import { mergerRouters } from "../libs/trpc"
import { postRouter } from "./post"
import { commmentRouter } from "./comment"
import { chatRouter } from "./chat"

export const appRouter = mergerRouters(userRouter, postRouter, commmentRouter, chatRouter)

export type AppRouter = typeof appRouter
