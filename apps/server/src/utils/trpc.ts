import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import isAuthed from '../middlewares/isAuthed'

const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res })
type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create()

const middleware = t.middleware
const router = t.router
const publicProcedure = t.procedure
const privateProcedure = t.procedure.use(isAuthed())
const mergerRouters = t.mergeRouters

export {
    createContext,
    middleware,
    router,
    publicProcedure,
    privateProcedure,
    mergerRouters,
}
