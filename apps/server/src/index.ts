import { Request, Response } from 'express'
import { createServer } from './server'

const port = process.env.PORT || 9000

const server = createServer()

server.get('/', (req: Request, res: Response) => {
    res.send('hello world how it is going')
})

server.listen(port, () => {
    console.log(`⚡️: Server is running at http://localhost:${port}`)
})
