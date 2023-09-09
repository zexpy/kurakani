import { userRouter } from './user'
import { mergerRouters } from '../utils/trpc'

export const appRouter = mergerRouters(userRouter)

export type AppRouter = typeof appRouter
