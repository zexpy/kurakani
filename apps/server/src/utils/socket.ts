import { IncomingMessage, ServerResponse, Server as HttpServer } from "http"
import { instrument } from "@socket.io/admin-ui"
import { Server } from "socket.io"
import { ClientToServerEvents, ServerToClientEvents, GiftedMessage } from "@kurakani/core"

export const initializeSocket = (
    httpServer: HttpServer<typeof IncomingMessage, typeof ServerResponse>,
) => {
    const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
        cors: {
            origin: ["http://localhost:19000", "https://admin.socket.io"],
            credentials: true,
        },
    })

    instrument(io, {
        auth: false,
        mode: "development",
    })

    io.on("connection", (socket) => {
        console.log(`✔: ${socket.id} just connected!`)

        socket.on("join chat", (chatId: string) => {
            console.log(`Room Joined: ${chatId}`)
            socket.join(chatId)
        })

        socket.on(
            "send message",
            ({ messages, chatId }: { messages: GiftedMessage; chatId: string }) => {
                socket.to(chatId).emit("message received", messages)
            },
        )
    })

    return io
}
