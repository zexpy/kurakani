import mongoose, { InferSchemaType, Types } from 'mongoose'

const commentSchema = new mongoose.Schema(
    {
        postId: {
            type: Types.ObjectId,
            ref: 'Posts',
        },
        userId: {
            type: Types.ObjectId,
            ref: 'Users',
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

type Comment = InferSchemaType<typeof commentSchema>
const CommentModel = mongoose.model<Comment>('Comment', commentSchema)

export default CommentModel
