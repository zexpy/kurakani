import { ClientToServerEvents, ServerToClientEvents } from "@kurakani/core"
import getBaseUrl from "../helper/url"
import { Socket, io } from "socket.io-client"

// const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(getBaseUrl())
const socket: Socket = io(getBaseUrl())

export default socket
