import express from 'express'
import cors from 'cors'
import { createContext } from './lib/trpc'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './router'

export const createServer = () => {
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use(
        '/trpc',
        trpcExpress.createExpressMiddleware({
            router: appRouter,
            createContext,
        })
    )

    return app
}
