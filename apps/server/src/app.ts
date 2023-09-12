import express, { Application } from 'express'
import cors from 'cors'
import { createContext } from './libs/trpc'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './routes'
import { createServer } from 'http'
import { config } from 'dotenv'
import { initializeDatabase } from './utils/mongo.db'
import { initializeSocket } from './utils/socket'

config()
const app: Application = express()
const server = createServer(app)
const port = process.env.PORT || 9000
app.use(cors())
initializeDatabase()
initializeSocket(server)
app.use(express.json())
app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
)

server.listen(port, () => {
    console.log(`⚡️: Server is running at http://localhost:${port}`)
})
