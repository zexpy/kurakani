import { z } from "zod"
import { privateProcedure } from "../../libs/trpc"
import PostModel from "../../models/post.schema"

export const getPhotoByUserId = privateProcedure.input(z.string()).query(async ({ input }) => {
    const photos = await PostModel.find({ user_id: input }).select("image")
    return photos
})
