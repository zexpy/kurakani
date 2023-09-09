import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React, { useState } from 'react'
import Navigation from './Navigation'
import { trpc } from '@libs/trpc'
import superjson from 'superjson'

const queryClient = new QueryClient()
const trpcClient = trpc.createClient({
    links: [httpBatchLink({ url: 'http://localhost:9000/trpc' })],
    transformer: undefined,
})

export default function App() {
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Navigation />
            </QueryClientProvider>
        </trpc.Provider>
    )
}
