import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({}) // no context
type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.create()

const middleware = t.middleware
const router = t.router
const publicProcedure = t.procedure
const mergerRouters = t.mergeRouters

export { createContext, middleware, router, publicProcedure, mergerRouters }
