import mongoose from "mongoose"
require("dotenv").config()

export function initializeDatabase() {
    mongoose.Promise = Promise
    mongoose.connect(process.env.DB_URL!, {})
    const db = mongoose.connection

    db.on("error", (err) => console.error((err as Error).message))
    db.on("open", () => console.log("💫 : Connected to the database!"))
}
