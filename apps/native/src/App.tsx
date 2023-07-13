import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navigation from './Navigation'
import { TamaguiProvider } from 'tamagui'
import config from '../tamagui.config'

const queryClient = new QueryClient()

export default function App() {
    return (
        <TamaguiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <Navigation />
            </QueryClientProvider>
        </TamaguiProvider>
    )
}
