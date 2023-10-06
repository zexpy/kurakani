import mongoose, { InferSchemaType, Types } from "mongoose"

const commentSchema = new mongoose.Schema(
    {
        post_id: {
            type: Types.ObjectId,
            ref: "Post",
        },
        user_id: {
            type: Types.ObjectId,
            ref: "User",
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
)

type Comment = InferSchemaType<typeof commentSchema>
const CommentModel = mongoose.model<Comment>("Comment", commentSchema)

export default CommentModel
