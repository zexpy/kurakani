import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
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
    profile_pic: {
        type: String,
    },
    bio: {
        type: String,
    },
    reg_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
})

/* userSchema.pre('save', async function() {
    const hashPassword = await 
}) */
export const UserModel = mongoose.model('User', userSchema)
