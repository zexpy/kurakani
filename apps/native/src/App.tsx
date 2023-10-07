import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { useState } from "react"
import Navigation from "./navigation/Navigation"
import { trpc } from "@libs/trpc"
import { api } from "@libs/api"

export default function App() {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() => api)

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Navigation />
            </QueryClientProvider>
        </trpc.Provider>
    )
}
