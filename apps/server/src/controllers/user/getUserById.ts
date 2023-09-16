import { z } from "zod";
import UserModel from "../../models/user.schema";
import { privateProcedure } from "../../libs/trpc";

export const getUserById = privateProcedure
  .input(z.string())
  .mutation(async (opts) => {
    console.log(opts);
    return await UserModel.findById(opts.input);
  });
