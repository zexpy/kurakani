import mongoose, { Schema, Types } from "mongoose"
import { InferSchemaType } from "mongoose"
import UserModel from "./user.schema"

enum FriendShipStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    CANCEL = "cancel",
    REJECTED = "rejected",
}

const friendShipSchema = new Schema(
    {
        sender_id: {
            type: Types.ObjectId,
            ref: "User",
        },
        receiver_id: {
            type: Types.ObjectId,
            ref: "User",
        },

        status: {
            type: String,
            enum: FriendShipStatus,
        },
    },

    {
        timestamps: true,
    },
)

type FriendShip = InferSchemaType<typeof friendShipSchema>

friendShipSchema.post("findOneAndUpdate", async function (docs) {
    const before = docs
    if (!before) {
        return
    }
    const { sender_id, receiver_id } = docs
    // @ts-ignore
    const after = this.getUpdate().$set

    if (before.status === "pending" && after.status === "accepted") {
        // UPDATE THE USER DATABASE
        await Promise.allSettled([
            UserModel.findByIdAndUpdate(sender_id, {
                $push: { friends: receiver_id },
            }),
            UserModel.findByIdAndUpdate(receiver_id, {
                $push: { friends: sender_id },
            }),
        ])
    }

    if (before.status === "pending" && ["cancel", "rejected"].includes(after.status)) {
        await FriendShipModel.findByIdAndDelete(docs._id)
    }
})

const FriendShipModel = mongoose.model<FriendShip>("FriendShip", friendShipSchema)

export default FriendShipModel
