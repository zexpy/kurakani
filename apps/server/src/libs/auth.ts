import JWT, { JwtPayload } from "jsonwebtoken"
require("dotenv").config()

const SECRET = process.env.JWT_SECRET!

interface JWTPayload {
    id: string
    email: string
    iat: Number
    exp: Number
}

export const signAccessToken = (user: any) => {
    return JWT.sign(user, SECRET, {
        expiresIn: "7d",
    })
}

export const verifyAccessToken = (token: string) => {
    return JWT.verify(token, SECRET) as JwtPayload
}
