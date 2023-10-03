import mongoose, { InferSchemaType, Schema, Types } from "mongoose"

const chatSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        isGroup: {
            type: Boolean,
            default: false,
        },
        latestMessage: {
            type: Types.ObjectId,
            ref: "Message",
        },
        users: [
            {
                type: Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    },
)

type Chat = InferSchemaType<typeof chatSchema>
const ChatModel = mongoose.model<Chat>("Chat", chatSchema)

export default ChatModel
