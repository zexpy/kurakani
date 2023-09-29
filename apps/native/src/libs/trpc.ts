import { createTRPCReact } from "@trpc/react-query"
import type { AppRouter } from "@kurakani/server"

export const trpc = createTRPCReact<AppRouter>()
