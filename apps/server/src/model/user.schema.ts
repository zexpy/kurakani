import mongoose, { InferSchemaType } from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        profile_pic: String,

        bio: String,
    },
    { timestamps: true }
)

type User = InferSchemaType<typeof userSchema>

export const UserModel = mongoose.model<User>('User', userSchema)
