import { z } from "zod"
import { privateProcedure } from "../../libs/trpc"
import MessageModel from "../../models/message.schema"
import UserModel from "../../models/user.schema"
import ChatModel from "../../models/chat.schema"

export const sendMessage = privateProcedure
    .input(
        z.object({
            content: z.string(),
            chatId: z.string(),
        }),
    )
    .mutation(async (opts) => {
        const id = opts?.ctx?.user?._id
        let message = await MessageModel.create({
            sender: id,
            content: opts.input.content,
            chat: opts.input.chatId,
        })

        message = await message.populate("sender", "name profile_pic")
        message = await message.populate("chat")
        // @ts-ignore
        message = await UserModel.populate(message, {
            path: "chat.users",
            select: "name profile_pic email",
        })

        await ChatModel.findByIdAndUpdate(opts.input.chatId, { latestMessage: message })

        return message
    })
