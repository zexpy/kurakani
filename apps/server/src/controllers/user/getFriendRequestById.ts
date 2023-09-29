import { z } from "zod"
import { privateProcedure } from "../../libs/trpc"
import FriendShipModel from "../../models/friendship.schema"

export const getFriendRequestById = privateProcedure.input(z.string()).query(async ({ input }) => {
    const friend = await FriendShipModel.find({
        receiver_id: input,
        status: "pending",
    }).populate("sender_id")

    return friend
})
