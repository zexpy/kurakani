import express, { Application } from 'express'
import cors from 'cors'
import { createContext } from './utils/trpc'
import * as trpcExpress from '@trpc/server/adapters/express'
import { Request, Response } from 'express'
import { appRouter } from './router'
const port = process.env.PORT || 9000

const app: Application = express()
app.use(express.json())
app.use(cors())
app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
)

app.get('/', (req: Request, res: Response) => {
    res.send('hello world how it is going')
})

app.listen(port, () => {
    console.log(`⚡️: Server is running at http://localhost:${port}`)
})
