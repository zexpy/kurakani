import UserModel from "../../models/user.schema";
import { privateProcedure } from "../../libs/trpc";

export const getAllUser = privateProcedure.query(async () => {
  return await UserModel.find();
});
