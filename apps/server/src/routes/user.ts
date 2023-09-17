import {
  loginUser,
  registerUser,
  getAllUser,
  updateUser,
  getUserById,
  getFriendRequestById,
  verifyProfile,
} from "../controllers/user";

import {
  addFriend,
  updateRequest,
  getFriendById,
  checkRequest,
} from "../controllers/friend";
import { router } from "../libs/trpc";

export const userRouter = router({
  getAllUser,
  registerUser,
  loginUser,
  updateUser,
  getUserById,
  addFriend,
  updateRequest,
  getFriendById,
  getFriendRequestById,
  checkRequest,
  verifyProfile,
});
