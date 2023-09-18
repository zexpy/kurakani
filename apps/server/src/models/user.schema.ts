import mongoose, { InferSchemaType, Types } from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        fullName: String,
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
        address: String,
        profile_pic: String,
        friends: [
            {
                type: Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true },
)

type User = InferSchemaType<typeof userSchema>

userSchema.pre("save", async function() {
    const hashPassword = await bcrypt.hash(this.password, 10)
    this.password = hashPassword
})

userSchema.methods.isValidPassword = async function(password: string) {
    return await bcrypt.compare(password, this.password)
}

const UserModel = mongoose.model<User>("User", userSchema)

export default UserModel
