import UserModel from "../../models/user.schema";
import { privateProcedure } from "../../libs/trpc";
import { z } from "zod";

export const verifyProfile = privateProcedure
  .input(
    z.object({
      id: z.string().readonly(),
      update: z.object({
        firstName: z.string(),
        lastName: z.string(),
        address: z.string(),
      }),
    })
  )
  .mutation(async (opts) => {
    return await UserModel.findByIdAndUpdate(
      opts.input.id,
      {
        ...opts.input.update,
        fullName: `${opts.input.update.firstName} ${opts.input.update.lastName}`,
      },
      {
        new: true,
      }
    );
  });
