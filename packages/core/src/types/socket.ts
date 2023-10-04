export interface ServerToClientEvents {
    noArg: () => void
    basicEmit: (a: number, b: string, c: Buffer) => void
    withAck: (d: string, callback: (e: number) => void) => void

    connected: () => void

    "message received": (message: any) => void
}

export interface ClientToServerEvents {
    hello: () => void
    setup: (user: any) => void
    "join chat": (chatId: string) => void
    "send message": (message: any) => void
}

export interface InterServerEvents {
    ping: () => void
}

export interface SocketData {
    name: string
    age: number
}
