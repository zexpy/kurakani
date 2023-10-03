import { z } from "zod"
import { privateProcedure } from "../../libs/trpc"
import ChatModel from "../../models/chat.schema"
import UserModel from "../../models/user.schema"

export const accessChat = privateProcedure
    .input(
        z.object({
            user_id: z.string(),
        }),
    )
    .mutation(async (opts) => {
        const isChat = await ChatModel.find({
            isGroup: false,
            $and: [
                { users: { $elemMatch: { $eq: opts?.ctx?.user?._id } } },
                { users: { $elemMatch: { $eq: opts.input.user_id } } },
            ],
        })
            .populate("users", "-password")
            .populate("latestMessage")

        const chatting = await UserModel.populate(isChat, {
            path: "latestMessage.sender",
            select: "username profile_pic email",
        })

        if (chatting.length > 0) {
            return chatting[0]
        }

        const chat = {
            chatName: "sender",
            isGroupChat: false,
            users: [opts.ctx.user?._id, opts.input.user_id],
        }

        const createdChat = await ChatModel.create(chat)
        const fullChat = await ChatModel.findOne({
            _id: createdChat._id,
        }).populate("users", "-password")
        return fullChat
    })
