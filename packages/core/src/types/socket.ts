export interface ServerToClientEvents {
    noArg: () => void
    basicEmit: (a: number, b: string, c: Buffer) => void
    withAck: (d: string, callback: (e: number) => void) => void

    connected: () => void

    getMessage: (message: any) => void

    "typing received": (user: Record<string, any>, typing: boolean) => void
}

export interface ClientToServerEvents {
    hello: () => void
    setup: (user: any) => void
    "join chat": (chatId: string) => void
    sendMessage: (message: any) => void
    typing: ({
        chatId,
        user,
        typing,
    }: {
        chatId: string
        user: Record<string, any>
        typing: boolean
    }) => void
}

export interface InterServerEvents {
    ping: () => void
}

export interface SocketData {
    name: string
    age: number
}
