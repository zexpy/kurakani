import mongoose, { Document, InferSchemaType } from 'mongoose'
import bcrypt from 'bcrypt'

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

userSchema.pre('save', async function () {
    const hashPassword = await bcrypt.hash(this.password, 10)
    this.password = hashPassword
})

userSchema.methods.isValidPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

type User = InferSchemaType<typeof userSchema>

export const UserModel = mongoose.model<User>('User', userSchema)
