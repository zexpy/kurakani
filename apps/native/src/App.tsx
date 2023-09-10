import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React, { useState } from 'react'
import Navigation from './Navigation'
import getBaseUrl from './helper/url'
import { trpc } from './libs/trpc'
import config from '../tamagui.config'
import { TamaguiProvider } from 'tamagui'

export default function App() {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [httpBatchLink({ url: `${getBaseUrl()}/trpc` })],
            transformer: null,
        })
    )
    return (
        <TamaguiProvider config={config}>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                    <Navigation />
                </QueryClientProvider>
            </trpc.Provider>
        </TamaguiProvider>
    )
}
