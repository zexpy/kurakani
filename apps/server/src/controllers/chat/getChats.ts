import { privateProcedure } from "../../libs/trpc"
import ChatModel from "../../models/chat.schema"
import UserModel from "../../models/user.schema"

export const getChats = privateProcedure.query(async (opts) => {
    const chats = await ChatModel.find({
        users: { $elemMatch: { $eq: opts.ctx.user?._id } },
    })
        .populate("users", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })

    return await UserModel.populate(chats, {
        path: "latestMessage.sender",
        select: "username profile_pic email",
    })
})
