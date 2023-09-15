import { z } from "zod";
import { privateProcedure } from "../../libs/trpc";
import FriendShipModel from "../../models/friendship.schema";
import { TRPCError } from "@trpc/server";

export const updateRequest = privateProcedure
  .input(
    z.object({
      sender_id: z.string(),
      receiver_id: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const friendShip = await FriendShipModel.findOneAndUpdate(
      {
        $or: [
          {
            sender_id: input.sender_id,
            receiver_id: input.receiver_id,
          },
          {
            sender_id: input.receiver_id,
            receiver_id: input.sender_id,
          },
        ],
      },
      {
        status: "accepted",
      }
    );

    if (!friendShip) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "NOT FOUND",
      });
    }

    return { status: 200 };
  });
