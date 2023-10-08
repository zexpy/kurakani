import { IncomingMessage, ServerResponse, Server as HttpServer } from "http"
import { instrument } from "@socket.io/admin-ui"
import { Server } from "socket.io"
import { ClientToServerEvents, ServerToClientEvents, GiftedMessage, IUser } from "@kurakani/core"
import { users, addUser, getUser, removeUser } from "../helpers/socket"

interface CTSProps {
    senderId: string
    receiverId: string
    messages?: GiftedMessage
    typing?: boolean
    sender?: IUser
}

export const initializeSocket = (
    httpServer: HttpServer<typeof IncomingMessage, typeof ServerResponse>,
) => {
    const io = new Server(httpServer, {
        cors: {
            origin: ["http://localhost:19000", "https://admin.socket.io"],
            credentials: true,
        },
    })

    io.on("connection", (socket: any) => {
        console.log(`✔: ${socket.id} just connected!`)

        socket.on("addUser", (userId: string) => {
            addUser(userId, socket.id)
            io.emit("getUsers", users)
        })

        socket.on("sendMessage", ({ senderId, receiverId, messages }: CTSProps) => {
            const user = getUser(receiverId)
            io.to(user?.socketId).emit("getMessage", {
                senderId,
                messages,
            })
        })

        socket.on("typing", ({ sender, receiverId, typing }: CTSProps) => {
            const user = getUser(receiverId)
            io.to(user?.socketId).emit("getTyping", {
                sender,
                typing,
            })
        })

        socket.on("disconnect", () => {
            console.log("user disconnected")
            removeUser(socket.id)
            io.emit("getUsers", users)
        })
    })

    return io
}
