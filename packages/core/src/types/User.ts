import { IMeta } from ".";

enum USER_GENDER {
  male = "MALE",
  female = "FEMALE",
}

enum FRIEND_REQUEST_STATUS {
  accepted = "ACCEPTED",
  pending = "PENDING",
  rejected = "REJECTED",
}

export interface IUser {
  _id: string;
  id?: string;
  email: string;
  username: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  userName?: string;
  gender?: USER_GENDER;
  address?: string;
  phone?: string;
  profile_pic?: string;
  coverImage?: string;
  friends?: IUser[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPost extends IMeta {
  id: string;
  thread: string;
  image?: string;
  likeCount: Pick<IUser, "id">[];
  comment?: IComment[];
  user: IUser;
}

export interface IComment extends IMeta {
  id: string;
  users: Pick<IUser, "id" | "email" | "fullName" | "avatar">[];
  content: string;
  postId: Pick<IPost, "id">;
}

export interface IFriendRequest {
  id: string;
  sendBy: IUser;
  sendTo: IUser;
  status: FRIEND_REQUEST_STATUS;
  // lifecycle make the IUser Friend entity updated when status get accepted
}
