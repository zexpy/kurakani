import { z } from "zod"
import { privateProcedure } from "../../libs/trpc"
import FriendShipModel from "../../models/friendship.schema"
import { TRPCError } from "@trpc/server"

export const addFriend = privateProcedure
    .input(
        z.object({
            sender_id: z.string(),
            receiver_id: z.string(),
        }),
    )
    .mutation(async ({ input }) => {
        const findRequest = await FriendShipModel.find({
            sender_id: input.sender_id,
            receiver_id: input.sender_id,
        })

        if (findRequest.length > 0) {
            throw new TRPCError({
                code: "FORBIDDEN",
                message: "Request already sent",
            })
        }

        const friendShip = new FriendShipModel({
            sender_id: input.sender_id,
            receiver_id: input.receiver_id,
            status: "pending",
        })
        await friendShip.save()
        return friendShip
    })
