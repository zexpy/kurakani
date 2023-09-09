import { publicProcedure } from '../lib/trpc'
import { z } from 'zod'

const getUser = publicProcedure.input(z.string()).query(opts => {
    return { message: `Hello my name is ${opts.input}` }
})

export { getUser }
