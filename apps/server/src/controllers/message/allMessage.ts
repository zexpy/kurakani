import { z } from "zod"
import { privateProcedure } from "../../libs/trpc"
import MessageModel from "../../models/message.schema"

export const allMessage = privateProcedure.input(z.string()).query(async (opts) => {
    return await MessageModel.find({ chat: opts.input }).populate(
        "sender",
        "name profile_pic email",
    )
})
