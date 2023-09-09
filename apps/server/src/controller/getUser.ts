import { publicProcedure } from '../utils/trpc'
import { z } from 'zod'

const getUser = publicProcedure.query(opts => {
    console.log('hello there')
    return { message: `Hello my name is Bibek` }
})

export { getUser }
