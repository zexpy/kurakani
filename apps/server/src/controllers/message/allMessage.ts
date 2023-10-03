import { z } from "zod"
import { privateProcedure } from "../../libs/trpc"
import MessageModel from "../../models/message.schema"

export const allMessage = privateProcedure.input(z.string()).query(async (opts) => {
    const messages = await MessageModel.find({ chat: opts.input })
        .populate("sender", "fulName profile_pic email")
        .sort({ createdAt: -1 })

    const formatMessage = messages.map((message) => ({
        _id: message._id,
        text: message.content,
        createdAt: message.createdAt,
        user: {
            // @ts-ignore
            _id: message.sender._id,
            // @ts-ignore
            name: message.sender.fullName,
            // @ts-ignore
            avatar: message.sender.profile_pic,
        },
    }))

    return formatMessage
})
