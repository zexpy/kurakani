import { httpBatchLink } from '@trpc/client'
import { trpc } from './trpc'
import getBaseUrl from '../helper/url'

let token: string
export const setToken = (newToken: string) => {
    token = newToken
}

export const api = trpc.createClient({
    links: [
        httpBatchLink({
            url: `${getBaseUrl()}/trpc`,
            headers() {
                if (!token) {
                    return
                }
                return {
                    Authorization: `Bearer ${token}`,
                }
            },
        }),
    ],
    transformer: null,
})
