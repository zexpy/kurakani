import express, { Application } from 'express'
import cors from 'cors'
import { createContext } from './utils/trpc'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './routes'
import mongoose from 'mongoose'

require('dotenv').config()
const port = process.env.PORT || 9000

const app: Application = express()
app.use(express.json())
app.use(cors())

mongoose.Promise = Promise
mongoose.connect(process.env.DB_URL!, {})
const db = mongoose.connection
db.on('error', err => console.error((err as Error).message))
db.on('open', () => console.log('💫 : Connected to database!'))

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
)

app.listen(port, () => {
    console.log(`⚡️: Server is running at http://localhost:${port}`)
})
