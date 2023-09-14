import {
  loginUser,
  registerUser,
  getAllUser,
  updateUser,
  getUserById,
} from "../controllers/user";
import { router } from "../libs/trpc";

export const userRouter = router({
  getAllUser,
  registerUser,
  loginUser,
  updateUser,
  getUserById,
});
