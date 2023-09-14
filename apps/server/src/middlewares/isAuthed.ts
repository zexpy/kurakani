import { TRPCError } from "@trpc/server";
import { middleware } from "../libs/trpc";
import { verifyAccessToken } from "../libs/auth";
import { UserModel } from "../models/user.schema";

const isAuthed = () =>
  middleware(async ({ ctx, next }) => {
    const { req } = ctx;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const decoded = verifyAccessToken(token);
    const user = await UserModel.findById(decoded.id);

    return next({
      ctx: {
        user,
      },
    });
  });

export default isAuthed;
