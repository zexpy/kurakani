import mongoose, { Types } from 'mongoose'

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    image: String,
    post_date: {
        type: Date,
        default: Date.now(),
    },
    likes_count: Number,
    user_id: {
        type: Types.ObjectId,
        ref: 'User',
    },
    comments: [
        {
            type: Types.ObjectId,
            ref: 'Comment',
        },
    ],
})

const PostModel = mongoose.model('Post', postSchema)

export default PostModel
