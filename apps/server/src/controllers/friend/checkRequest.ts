import { z } from "zod";
import { privateProcedure } from "../../libs/trpc";
import FriendShipModel from "../../models/friendship.schema";
import { TRPCError } from "@trpc/server";

export const checkRequest = privateProcedure
    .input(
        z.object({
            sender_id: z.string(),
            receiver_id: z.string(),
        })
    )
    .query(async ({ input }) => {
        const friendShip = await FriendShipModel.findOne({
            sender_id: input.sender_id,
            receiver_id: input.receiver_id,
            status: { $ne: "accepted" },
        });

        if (!friendShip) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "NOT FOUND",
            });
        }

        return { status: friendShip.status };
    });
