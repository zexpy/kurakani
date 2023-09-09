import { userRouter } from './user'
import { mergerRouters } from '../lib/trpc'

export const appRouter = mergerRouters(userRouter)

export type AppRouter = typeof appRouter
