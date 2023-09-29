import { userRouter } from "./user"
import { mergerRouters } from "../libs/trpc"
import { postRouter } from "./post"
import { commmentRouter } from "./comment"

export const appRouter = mergerRouters(userRouter, postRouter, commmentRouter)

export type AppRouter = typeof appRouter
