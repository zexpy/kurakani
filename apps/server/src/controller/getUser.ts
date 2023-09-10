import { publicProcedure } from '../utils/trpc'
import { z } from 'zod'

const getUser = publicProcedure.query(opts => {
    return { message: `Hello my name is Bibek` }
})

export { getUser }
