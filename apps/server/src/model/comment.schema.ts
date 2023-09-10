import mongoose, { Types } from 'mongoose'

const commentSchema = new mongoose.Schema({
    post_id: {
        type: Types.ObjectId,
        ref: 'Posts',
    },
    user_id: {
        type: Types.ObjectId,
        ref: 'Users',
    },
    content: {
        type: String,
        required: true,
    },
    comment_date: {
        type: Date,
        default: Date.now(),
    },
})

const CommentModel = mongoose.model('Comment', commentSchema)

export default CommentModel
