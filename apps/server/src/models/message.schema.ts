import mongoose, { InferSchemaType, Schema, Types } from "mongoose"

const messageSchema = new Schema(
    {
        sender: {
            type: Types.ObjectId,
            ref: "User",
        },
        content: {
            type: String,
            trim: true,
        },
        chat: {
            type: Types.ObjectId,
            ref: "Chat",
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
)

type Message = InferSchemaType<typeof messageSchema>
const MessageModel = mongoose.model<Message>("Message", messageSchema)

export default MessageModel
